import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


// UPDATE BLOG

export async function PATCH(
    req: Request,
    { params }: { params: { blogId: string } }
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


        if (!params.blogId) {
            return new NextResponse("Blog ID is required", { status: 400 });
        }

        await prismadb.blog.update({
            where: {
                id: params.blogId,
            },
            data: {
                title,
                content,
                writer,
                BlogImages: {
                    deleteMany: {}
                }
            }
        });

        const blog = await prismadb.blog.update({
            where: {
                id: params.blogId,
            },
            data: {
                BlogImages: {
                    createMany: {
                        data: [
                            ...BlogImages.map((image: { urel: string }) => image)
                        ]
                    }
                }
            }
        })

        return NextResponse.json(blog);

    } catch (error) {
        console.log('[BLOG_PATCH] ', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

// DELETE Blog 

export async function DELETE(
    req: Request,
    { params }: { params: { blogId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.blogId) {
            return new NextResponse("Blog ID is required", { status: 400 });
        }

        const blog = await prismadb.blog.deleteMany({
            where: {
                id: params.blogId,
            }
        })

        return NextResponse.json(blog);

    } catch (error) {
        console.log('[BLOG_DELETE] ', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}



export async function GET(
    req: Request,
    { params }: { params: { blogId: string } }
) {
    try {

        if (!params.blogId) {
            return new NextResponse("Blog ID is required", { status: 400 });
        }

        const blog = await prismadb.blog.findUnique({
            where: {
                id: params.blogId,
            },
            include: {
                BlogImages: true,
            }
        })

        return NextResponse.json(blog);

    } catch (error) {
        console.log('[BLOG_GET_ID] ', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}

