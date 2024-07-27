import React, {useEffect} from 'react';
import {DataTable} from "@/components/DataTable";
import {Plant, useStore} from "@/store";
import {SidebarRecordDetails} from "@/components/SidebarRecordDetails";
import {Toaster} from "@/components/ui/toaster";
import {toast} from "@/components/ui/use-toast";
import {fields} from "@/lib/FieldDef";
import {CellContext, ColumnDef} from "@tanstack/react-table";
import {TableActions} from "@/components/TableActions";

export const PlantListPage = () => {
    const plants = useStore((state) => state.plants);
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
        .map(field => ({
            accessorKey: field.name,
            header: field.displayName,
            cell: ({getValue}: CellContext<Plant, unknown>) => {
                const value = getValue();
                if (value) {
                    return `${value.toString()} ${field.postfix || ""}`;
                }
                return field.nullValue || "";
            },
        }));
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
            <SidebarRecordDetails fields={fields}/>
            <Toaster/>
        </div>
    );
};
