"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ContactColumns = {
    id: string
    phone: string
    email: string
    createdAt: string
}

export const columns: ColumnDef<ContactColumns>[] = [
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    }
]
