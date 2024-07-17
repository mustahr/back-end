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
            content,
            writer,
            BlogImages,
        } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!title) {
            return new NextResponse("Blog title is required", { status: 400 });
        }

        if (!BlogImages || !BlogImages.length) {
            return new NextResponse("Images are required", { status: 400 });
        }

        if (!writer) {
            return new NextResponse("Writer name is required", { status: 400 });
        }

        if (!content) {
            return new NextResponse("Blog content is required", { status: 400 });
        }

        const blog = await prismadb.blog.create({
            data: {
                title,
                content,
                writer,
                BlogImages: {
                    createMany: {
                        data: [
                            ...BlogImages.map((image: { url: string }) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(blog);

    } catch (error) {
        console.log('[BLOGS_POST]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}

export async function GET() {
    try {

        const blog = await prismadb.blog.findMany({
            include: {
                BlogImages: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(blog);

    } catch (error) {
        console.log('[BLOGS_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });

    }
}