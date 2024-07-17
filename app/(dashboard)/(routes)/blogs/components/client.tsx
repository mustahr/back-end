"use client"
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { BlogColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BlogClientProps {
    data: BlogColumns[];
}

export const BlogClient: React.FC<BlogClientProps> = ({
    data
}) => {
    const router = useRouter();


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Blogs (${data.length})`}
                    description="Manage Blogs for your website"
                />
                <Button onClick={() => router.push(`/blogs/new`)}>
                    <Plus className="mr-2 h-4 w-4 " />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="title" columns={columns} data={data} />
            <Heading title="API" description="API calls for blogs" />
            <Separator />
            <ApiList entityName="blogs" entityIdName="Id" />
        </>
    )
}