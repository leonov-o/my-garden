import {Plant, useStore} from "@/store";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import React from "react";
import {CaretDownIcon, CaretUpIcon} from "@radix-ui/react-icons";
import {DataTableColumnHeader} from "@/components/DataTableColumnHeader";
import {DataTablePagination} from "@/components/DataTablePagination";
import {cn} from "@/lib/utils";


interface DataTableProps<TValue> {
    columns: ColumnDef<Plant, TValue>[]
    data: Plant[]
}

export function DataTable<TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TValue>) {

    const columnVisibility = useStore(state => state.columnVisibility);
    const selectedRecord = useStore(state => state.selectedPlant);
    const setColumnVisibility = useStore(state => state.setColumnVisibility);

    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility
        },
    })

    return (
        <div className="h-[85vh]">
            <DataTableColumnHeader table={table}/>
            <div className="rounded-md border h-5/6">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="select-none"
                                                   onClick={header.column.getToggleSortingHandler()}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                            {{
                                                asc: <CaretUpIcon className="inline ml-1"/>,
                                                desc: <CaretDownIcon className="inline ml-1"/>,
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className={cn(
                                            "text-center",
                                            {
                                                "bg-green-100": row.getValue("id") === selectedRecord?.id
                                            }
                                        )} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Ничего не найдено
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table}/>
        </div>
    )
}
