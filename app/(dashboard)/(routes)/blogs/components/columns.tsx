"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type BlogColumns = {
    id: string
    title: string
    content: string
    writer: string
    createdAt: string
}

export const columns: ColumnDef<BlogColumns>[] = [
    {
        accessorKey: "writer",
        header: "Writer",
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "content",
        header: "Content",
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
