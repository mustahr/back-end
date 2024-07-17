import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


// UPDATE Trip

export async function PATCH(
    req: Request,
    { params }: { params: { tripId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const {
            title,
            description,
            moreInfos,
            keywords,
            images,
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

        if (!keywords) {
            return new NextResponse("KeyWords are required", { status: 400 });
        }

        if (!moreInfos) {
            return new NextResponse("More infos are required", { status: 400 });
        }

        if (!params.tripId) {
            return new NextResponse("Trip ID is required", { status: 400 });
        }

        await prismadb.trip.update({
            where: {
                id: params.tripId,
            },
            data: {
                title,
                description,
                moreInfos,
                keywords,
                Images: {
                    deleteMany: {}
                }
            }
        });

        const trip = await prismadb.trip.update({
            where: {
                id: params.tripId,
            },
            data: {
                Images: {
                    createMany: {
                        data: [
                            ...images.map((image: { urel: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(trip);

    } catch (error) {
        console.log('[TRIP_PATCH] ', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

// DELETE TRIP 

export async function DELETE(
    req: Request,
    { params }: { params: { tripId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.tripId) {
            return new NextResponse("Trip ID is required", { status: 400 });
        }

        const trip = await prismadb.trip.deleteMany({
            where: {
                id: params.tripId,
            }
        })

        return NextResponse.json(trip);

    } catch (error) {
        console.log('[TRIP_DELETE] ', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}



export async function GET(
    req: Request,
    { params }: { params: { tripId: string } }
) {
    try {

        if (!params.tripId) {
            return new NextResponse("Trip ID is required", { status: 400 });
        }

        const trip = await prismadb.trip.findUnique({
            where: {
                id: params.tripId,
            },
            include: {
                Images: true,
            }
        })

        return NextResponse.json(trip);

    } catch (error) {
        console.log('[TRIP_GET_ID] ', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

