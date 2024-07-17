"use client"

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";

import { ContactColumns, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table";

interface ContactClientProps {
    data: ContactColumns[];
}

export const ContactClient: React.FC<ContactClientProps> = ({
    data
}) => {


    return (
        <>
            <Heading
                title={`Contacts (${data.length})`}
                description="Manage Contacts"
            />
            <Separator />
            <DataTable searchKey="email" columns={columns} data={data} />
        </>
    )
}