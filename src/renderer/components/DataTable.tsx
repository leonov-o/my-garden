import {Plant} from "@/store";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel, getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Button} from "@/components/ui/button";
import React from "react";
import {
    CaretDownIcon,
    CaretUpIcon, ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    EyeOpenIcon,
    Pencil1Icon,
    TrashIcon
} from "@radix-ui/react-icons";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DataTableColumnHeader} from "@/components/DataTableColumnHeader";
import {DataTablePagination} from "@/components/DataTablePagination";

export const columns: ColumnDef<Plant>[] = [
    {
        accessorKey: "id",
        header: "№",
    },
    {
        accessorKey: "name",
        header: "Название",
    },
    {
        accessorKey: "description",
        header: "Описание",
    },
    {
        accessorKey: "width",
        header: "Ширина",
    },
    {
        accessorKey: "height",
        header: "Высота",
    },
    {
        accessorKey: "crownShape",
        header: "Форма короны",
    },
    {
        accessorKey: "foliageColor",
        header: "Цвет листьев",
    },
    {
        accessorKey: "growthRate",
        header: "Скорость роста",
    },
    {
        accessorKey: "crownTexture",
        header: "Фактура короны",
    },
    {
        accessorKey: "floweringPeriod",
        header: "Период цветения",
    },
    {
        accessorKey: "flowerColor",
        header: "Цвет цветка",
    },
    {
        accessorKey: "lightPreference",
        header: "Предпочтение освещения",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            return (
                <div className="flex space-x-1">
                    <Button variant="outline" size="icon"><EyeOpenIcon/></Button>
                    <Button variant="outline" size="icon"><Pencil1Icon/></Button>
                    <Button variant="destructive" size="icon"><TrashIcon/></Button>
                </div>
            )
        },
    }

];


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {


    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})

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
                                        <TableCell key={cell.id}>
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
