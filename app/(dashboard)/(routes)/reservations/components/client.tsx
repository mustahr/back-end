"use client"

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";

import { ReservationsColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table";

interface ReservationsClientProps {
    data: ReservationsColumns[];
}

export const ReservationsClient: React.FC<ReservationsClientProps> = ({
    data
}) => {


    return (
        <>
            <Heading
                title={`Reservations (${data.length})`}
                description="Manage Reservations"
            />
            <Separator />
            <DataTable searchKey="email" columns={columns} data={data} />
        </>
    )
}