import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface Rates {
	numberOfPax: string;
	ratePerPax: string;
}

interface DaySchedule {
	day: string;
	itineraries: [Itinerary];
}

interface Itinerary {
	time: string;
	activity: string;
}

export async function POST(req: NextRequest) {
	const packageData = await req.json();
	const createdPackage = await prisma.package.create({
		data: {
			name: packageData.name,
			description: packageData.description,
			type: packageData.type,
			location: packageData.location,
			duration: packageData.duration,
			cancellation: packageData.cancellation,
			availability: packageData.availability,
			language: packageData.language,
			inclusions: { set: packageData.inclusions },
			exclusions: { set: packageData.exclusions },
			notice: packageData.notice,
			rates: {
				create: packageData.rates.map((rates: Rates) => ({
					numberOfPax: rates.numberOfPax,
					ratePerPax: rates.ratePerPax,
				})),
			},
			itinerary: {
				create: packageData.itinerary.map((daySchedule: DaySchedule) => ({
					day: daySchedule.day,
					itineraries: {
						create: daySchedule.itineraries.map((itinerary: Itinerary) => ({
							time: itinerary.time,
							activity: itinerary.activity,
						})),
					},
				})),
			},
			photos: { set: packageData.photos },
		},
		include: {
			rates: true,
			itinerary: {
				include: {
					itineraries: true,
				},
			},
		},
	});
	return NextResponse.json(createdPackage, { status: 200 });
}

export async function GET(req: NextRequest) {
	try {
		const packages = await prisma.package.findMany({
			include: {
				rates: true,
				itinerary: {
					include: {
						itineraries: true,
					},
				},
			},
		});
		return NextResponse.json(packages, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(error, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}
