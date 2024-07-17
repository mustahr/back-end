"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type TripColumns = {
    id: string
    title: string
    description: string
    moreInfos: string
    keywords: string
    createdAt: string
}

export const columns: ColumnDef<TripColumns>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "moreInfos",
        header: "More Info",
    },
    {
        accessorKey: "keywords",
        header: "Keywords",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    },
]
