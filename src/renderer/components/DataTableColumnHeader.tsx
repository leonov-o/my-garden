import {Table} from "@tanstack/react-table"
import {Input} from "@/components/ui/input";
import {FiltersButton} from "@/components/FiltersButton";
import {ColumnsButton} from "@/components/ColumnsButton";

interface DataTableColumnHeaderProps<TData> {
    table: Table<TData>
}

export function DataTableColumnHeader<TData>({table}: DataTableColumnHeaderProps<TData>) {
    return (
        <div className="flex items-center py-4">
            <Input
                placeholder="Поиск..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
            />
            <FiltersButton table={table}/>
            <ColumnsButton table={table}/>
        </div>
    )
}
