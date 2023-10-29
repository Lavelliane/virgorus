import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface RatesAndInclusions {
	numberOfPax: string;
	ratePerPax: string;
	inclusions: [string];
	exclusions: [string];
}

interface Itinerary {
	time: string;
	activity: string;
}

export async function POST(req: NextRequest){
    const packageData = await req.json();

    // Create the package and related data in the database
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
        notice: packageData.notice,
        ratesAndInclusions: {
          create: packageData.ratesAndInclusions.map((ratesAndInclusion: RatesAndInclusions) => {
            return {
              numberOfPax: ratesAndInclusion.numberOfPax,
              ratePerPax: ratesAndInclusion.ratePerPax,
              inclusions: { set: ratesAndInclusion.inclusions },
              exclusions: { set: ratesAndInclusion.exclusions },
            };
          }),
        },
        itinerary: {
          create: packageData.itinerary.map((itinerary: Itinerary) => {
            return {
              time: itinerary.time,
              activity: itinerary.activity,
            };
          }),
        },
        expectations: { set: packageData.expectations },
        photos: { set: packageData.photos },
      },
    });
    return NextResponse.json(createdPackage, { status: 200 })
}