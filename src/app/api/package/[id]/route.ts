import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;
  try {
    const tourPackage = await prisma.package.findUnique({
      where: { id: +id },
      include: {
        ratesAndInclusions: true,
        itinerary: {
          include: {
            itineraries: true,
          },
        },
      },
    });
    return NextResponse.json(tourPackage, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(error, { status: 500 })
  }
}
