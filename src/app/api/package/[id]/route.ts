import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface Rates {
	id?: number;
	packageId?: string;
	numberOfPax: string;
	ratePerPax: string;
}

interface DaySchedule {
	id?: number;
	packageId?: string;
	day: string;
	itineraries: [Itinerary];
}

interface Itinerary {
	id?: number;
	time?: string;
	activity?: string;
}

export async function GET(req: NextRequest, context: any) {
	const { id } = context.params;
	try {
		const tourPackage = await prisma.package.findUnique({
			where: { id: +id },
			include: {
				rates: true,
				itinerary: {
					include: {
						itineraries: true,
					},
				},
			},
		});
		return NextResponse.json(tourPackage, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(error, { status: 500 });
	} finally {
		await prisma.$disconnect();
	}
}

export async function PATCH(req: NextRequest, context: any) {
	const { id } = context.params;
	const newData = await req.json();
	try {
		const updatedPackage = await prisma.package.update({
			where: { id: +id },
			data: {
				name: newData.name,
				description: newData.description,
				type: newData.type,
				location: newData.location,
				duration: newData.duration,
				cancellation: newData.cancellation,
				availability: newData.availability,
				language: newData.language,
				inclusions: { set: newData.inclusions },
				exclusions: { set: newData.exclusions },
				notice: newData.notice,
				rates: {
					create: newData.rates.map((rate: Rates) => ({
						numberOfPax: rate.numberOfPax,
						ratePerPax: rate.ratePerPax,
					})),
				},
				itinerary: {
					create: newData.itinerary.map((daySchedule: DaySchedule) => ({
						day: daySchedule.day,
						itineraries: {
							create: daySchedule.itineraries.map((itinerary: Itinerary) => ({
								time: itinerary.time,
								activity: itinerary.activity,
							})),
						},
					})),
				},
				photos: { set: newData.photos },
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
		return NextResponse.json(updatedPackage, { status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, context: any) {
	const { id } = context.params;
	try {
		await prisma.package.delete({
			where: { id: +id },
		});
		return NextResponse.json({ status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
