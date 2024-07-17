"use client"

import { ColumnDef } from "@tanstack/react-table"

export type ReservationsColumns = {
    id: string
    tripTitle: string
    phone: string
    email: string
    createdAt: string
}

export const columns: ColumnDef<ReservationsColumns>[] = [
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "tripTitle",
        header: "Total Price",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    }
]
