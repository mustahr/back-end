import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const {
            title,
            description,
            moreInfos,
            keywords,
            images
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!title) {
            return new NextResponse("Trip title is required", { status: 400 });
        }

        if (!images || !images.length) {
            return new NextResponse("Images are required", { status: 400 });
        }

        if (!description) {
            return new NextResponse("Description is required", { status: 400 });
        }

        if (!moreInfos) {
            return new NextResponse("More infos are required", { status: 400 });
        }

        if (!keywords) {
            return new NextResponse("Keywords are required", { status: 400 });
        }

        const trip = await prismadb.trip.create({
            data: {
                title,
                description,
                moreInfos,
                keywords,
                Images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(trip);

    } catch (error) {
        console.log('[TRIPS_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}

export async function GET() {
    try {

        const trip = await prismadb.trip.findMany({
            include: {
                Images: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(trip);

    } catch (error) {
        console.log('[TRIPS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}
