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
import {Button} from "@/components/ui/button";
import React from "react";
import {CaretDownIcon, CaretUpIcon, EyeOpenIcon, Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {DataTableColumnHeader} from "@/components/DataTableColumnHeader";
import {DataTablePagination} from "@/components/DataTablePagination";
import {cn} from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

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
        accessorKey: "count",
        header: "Количество",
        cell: ({getValue}) => {
            return `${getValue() || 0} шт`
        },
    },
    {
        accessorKey: "description",
        header: "Описание",
        cell: ({getValue}) => {
            return getValue() || "-"
        },
    },
    {
        accessorKey: "width",
        header: "Ширина",
        cell: ({getValue}) => {
            return `${getValue() || 0} м`
        },
    },
    {
        accessorKey: "height",
        header: "Высота",
        cell: ({getValue}) => {
            return `${getValue() || 0} м`
        },
    },
    {
        accessorKey: "crownShape",
        header: "Форма короны",
        cell: ({getValue}) => {
            return getValue() || "-"
        },
    },
    {
        accessorKey: "foliageColor",
        header: "Цвет листьев",
        cell: ({getValue}) => {
            return getValue() || "-"
        },
    },
    {
        accessorKey: "growthRate",
        header: "Скорость роста",
        cell: ({getValue}) => {
            return getValue() || "-"
        },
    },
    {
        accessorKey: "crownTexture",
        header: "Фактура короны",
        cell: ({getValue}) => {
            return getValue() || "-"
        },
    },
    {
        accessorKey: "floweringPeriod",
        header: "Период цветения",
        cell: ({getValue}) => {
            return getValue() || "-"
        },
    },
    {
        accessorKey: "flowerColor",
        header: "Цвет цветка",
        cell: ({getValue}) => {
            return getValue() || "-"
        },
    },
    {
        accessorKey: "lightPreference",
        header: "Предпочтение освещения",
        cell: ({getValue}) => {
            return getValue() || "-"
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const sidebarRead = useStore(state => state.sidebarRead);
            const sidebarUpdate = useStore(state => state.sidebarUpdate);
            const deletePlant = useStore(state => state.deletePlant);

            const id = row.original.id;
            return (
                <div className="flex space-x-1">
                    <Button variant="outline" size="icon" onClick={() => sidebarRead(id)}><EyeOpenIcon/></Button>
                    <Button variant="outline" size="icon" onClick={() => sidebarUpdate(id)}><Pencil1Icon/></Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon"><TrashIcon/></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Вы точно хотите удалить эту запись?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => deletePlant(id)}>
                                    Удалить
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        },
    }

];

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
                                                "bg-green-100": row.original.id === selectedRecord?.id
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
