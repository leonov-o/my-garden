import React, {useEffect} from 'react';
import {DataTable} from "@/components/DataTable";
import {Plant, useStore} from "@/store";
import {SidebarRecordDetails} from "@/components/SidebarRecordDetails";
import {Toaster} from "@/components/ui/toaster";
import {toast} from "@/components/ui/use-toast";
import {fields} from "@/lib/FieldDef";
import {CellContext, ColumnDef, FilterFn} from "@tanstack/react-table";
import {TableActions} from "@/components/TableActions";
import {FilterFnOption} from "@tanstack/table-core/src/features/ColumnFiltering";

const highlightText = (text: string, filter: string) => {
    if (!filter) return text;
    const regex = new RegExp(`(${filter})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
        part.toLowerCase() === filter.toLowerCase() ? (
            <span key={index} className="bg-yellow-200">
        {part}
      </span>
        ) : (
            part
        )
    );
};

export const PlantListPage = () => {
    const plants = useStore((state) => state.plants);
    const isSidebarOpen = useStore((state) => state.isSidebarOpen);
    const toastMessage = useStore((state) => state.toastMessage);

    useEffect(() => {
        if (toastMessage) {
            toast({
                description: toastMessage,
                className: "bg-green-600 text-white",
            })
        }
    }, [toastMessage])

    const columns: ColumnDef<Plant>[] = fields
        .filter(field => field.display)
        .map(field => {
            let filterFn: FilterFnOption<Plant> | FilterFn<Plant> = "equalsString";
            if (field.type === "number") {
                filterFn = "inNumberRange";
            } else if (field.type === "string[]") {
                filterFn = "includesString";
            } else if (field.type === "string-grouped") {
                filterFn = (row, columnId, filterValue) => {
                    const values = row.getValue(columnId).toString().toLowerCase().split(',').map(v => v.trim());
                    const groupValues = field.groupedData[filterValue];
                    return groupValues.some(groupValue => values.includes(groupValue.toLowerCase()));
                }
            }

            return {
                accessorKey: field.name,
                accessorFn: (row: Plant) => row[field.name as keyof Plant] || "",
                header: field.displayName,
                cell: ({getValue, table}: CellContext<Plant, unknown>) => {
                    const value = getValue();

                    if (value) {
                        return highlightText(`${value.toString()} ${field.postfix || ""}`, table.getState().globalFilter);
                    }
                    return field.nullValue || "";
                },
                filterFn
            }
        });
    columns.push({
            id: "actions",
            enableHiding: false,
            cell: ({row}) => {
                return <TableActions id={row.original.id}/>;
            },
        }
    );

    return (
        <div className="">
            <DataTable columns={columns} data={plants}/>
            {isSidebarOpen && <SidebarRecordDetails fields={fields}/>}
            <Toaster/>
        </div>
    );
};
