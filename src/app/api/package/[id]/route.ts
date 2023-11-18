import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';

const prisma = new PrismaClient();

export const config = {
	api: {
	  bodyParser: false,
	},
};

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
		const updatedPackage = await prisma.$transaction(async (prisma) => {
			// Update package data
			const updatedPackage = await prisma.package.update({
				where: { id: +id },
				data: {
					...newData,
					rates: {
						deleteMany: { packageId: parseInt(id) },
						create: newData.rates.map((rate: Rates) => ({
							numberOfPax: rate.numberOfPax,
							ratePerPax: rate.ratePerPax,
						})),
					},
					itinerary: {
						deleteMany: { packageId: parseInt(id) },
						create: newData.itinerary.map((item: DaySchedule) => ({
							day: item.day,
							itineraries: {
								create: item.itineraries.map((subItem: Itinerary) => ({
									time: subItem.time,
									activity: subItem.activity,
								})),
							},
						})),
					},
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

			return updatedPackage;
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
