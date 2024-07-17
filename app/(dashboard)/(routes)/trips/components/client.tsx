"use client"
import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { TripColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface TripClientProps {
    data: TripColumns[];
}

export const TripClient: React.FC<TripClientProps> = ({
    data
}) => {
    const router = useRouter();


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Trips (${data.length})`}
                    description="Manage trips for your website"
                />
                <Button onClick={() => router.push(`/trips/new`)}>
                    <Plus className="mr-2 h-4 w-4 " />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="title" columns={columns} data={data} />
            <Heading title="API" description="API calls for Trips" />
            <Separator />
            <ApiList entityName="trips" entityIdName="Id" />
        </>
    )
}