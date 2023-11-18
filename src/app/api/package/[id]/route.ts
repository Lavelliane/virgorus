import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import formidable from 'formidable';

const prisma = new PrismaClient();
const supabase = createClient(
	`${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}`,
	`${process.env.NEXT_PUBLIC_SUPABASE_API_KEY}`
);

interface Rates {
	id?: string;
	packageId?: string;
	numberOfPax: string;
	ratePerPax: string;
}

interface DaySchedule {
	id?: string;
	packageId?: string;
	day: string;
	itineraries: [Itinerary];
}

interface Itinerary {
	id?: string;
	time?: string;
	activity?: string;
}

export async function GET(req: NextRequest, context: any) {
	const { id } = context.params;
	try {
		const tourPackage = await prisma.package.findUnique({
			where: { id: id },
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

export async function PATCH(req: any, context: any) {
	const { id } = context.params;

	//const newData = await req.json();
	const formData = await req.formData();
	const files = formData.getAll('photos');
	if (!files) {
		return NextResponse.json({ error: 'No files received.' }, { status: 400 });
	}

	for (let file of files) {
		const { data, error } = await supabase.storage
			.from('virgorus-package-images')
			.upload(`packages/${id}/${file.name}`, file, {
				cacheControl: '3600',
				upsert: false,
			});

		if (error) {
			console.error('Supabase storage error:', error);
			return NextResponse.json({ error }, { status: 500 });
		}
	}
	const photoUrls = await Promise.all(
		files.map(async (file: File) => {
			const { data } = await supabase.storage
				.from('virgorus-package-images')
				.getPublicUrl(`packages/${id}/${file.name}`);
			return data?.publicUrl || '';
		})
	);
	const packageData = {
		id: formData.id,
		name: formData.get('name').replace(/^"(.*)"$/, '$1'),
		description: formData.get('description').replace(/^"(.*)"$/, '$1'),
		type: formData.get('type').replace(/^"(.*)"$/, '$1'),
		location: formData.get('location').replace(/^"(.*)"$/, '$1'),
		duration: formData.get('duration').replace(/^"(.*)"$/, '$1'),
		cancellation: formData.get('cancellation').replace(/^"(.*)"$/, '$1'),
		availability: formData.get('availability').replace(/^"(.*)"$/, '$1'),
		language: formData.get('language').replace(/^"(.*)"$/, '$1'),
		inclusions: JSON.parse(formData.getAll('inclusions')[0]),
		exclusions: JSON.parse(formData.getAll('exclusions')[0]),
		notice: formData.get('notice').replace(/^"(.*)"$/, '$1'),
		rates: JSON.parse(formData.getAll('rates')[0]),
		itinerary: JSON.parse(formData.getAll('itinerary')[0]),
		photos: photoUrls || formData.photos,
	};

	try {
		const updatedPackage = await prisma.$transaction(async (prisma) => {
			// Update package data
			const updatedPackage = await prisma.package.update({
				where: { id: id },
				data: {
					...packageData,
					rates: {
						deleteMany: { packageId: parseInt(id) },
						create: packageData.rates.map((rate: Rates) => ({
							numberOfPax: rate.numberOfPax,
							ratePerPax: rate.ratePerPax,
						})),
					},
					itinerary: {
						deleteMany: { packageId: parseInt(id) },
						create: packageData.itinerary.map((item: DaySchedule) => ({
							day: item.day,
							itineraries: {
								create: item.itineraries.map((subItem: Itinerary) => ({
									time: subItem.time,
									activity: subItem.activity,
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
			where: { id: id },
		});
		return NextResponse.json({ status: 200 });
	} catch (error) {
		return NextResponse.json(error, { status: 500 });
	}
}
