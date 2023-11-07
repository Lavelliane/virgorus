import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface RatesAndInclusions {
  numberOfPax: string;
  ratePerPax: string;
}

interface Itinerary {
  time?: string;
  activity?: string;
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
      ratesAndInclusions: {
        create: packageData.ratesAndInclusions.map(
          (ratesAndInclusion: RatesAndInclusions) => {
            return {
              numberOfPax: ratesAndInclusion.numberOfPax,
              ratePerPax: ratesAndInclusion.ratePerPax,
            };
          }
        ),
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
  return NextResponse.json(createdPackage, { status: 200 });
}

export async function GET(req: NextRequest) {
  try {
    const packages = await prisma.package.findMany({
      include: {
        ratesAndInclusions: true,
        itinerary: {
          include: {
            itineraries: true,
          },
        },
      },
    });
    return NextResponse.json(packages, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(error, { status: 500 })
  } finally {
    await prisma.$disconnect();
  }
}
