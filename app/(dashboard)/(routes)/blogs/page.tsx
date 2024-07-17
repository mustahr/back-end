import { format } from 'date-fns';
import prismadb from "@/lib/prismadb";

import { BlogClient } from "./components/client";
import { BlogColumns } from "./components/columns";

const BlogPage = async () => {

    const blogs = await prismadb.blog.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedBlogs: BlogColumns[] = blogs.map((item) => ({
        id: item.id,
        title: item.title,
        content: item.content,
        writer: item.writer,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BlogClient data={formattedBlogs} />
            </div>
        </div>
    )
}
export default BlogPage