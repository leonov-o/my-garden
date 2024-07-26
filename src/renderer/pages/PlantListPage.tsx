import React, {useEffect} from 'react';
import {columns, DataTable} from "@/components/DataTable";
import {useStore} from "@/store";
import {SidebarRecordDetails} from "@/components/SidebarRecordDetails";
import {Toaster} from "@/components/ui/toaster";
import {toast} from "@/components/ui/use-toast";

export const PlantListPage = () => {
    const plants = useStore((state) => state.plants);
    const toastMessage = useStore((state) => state.toastMessage);

    useEffect(()=> {
        if(toastMessage) {
            toast({
                description: toastMessage,
                className: "bg-green-600 text-white",
            })
        }
    }, [toastMessage])

    return (
        <div className="">
            <DataTable columns={columns} data={plants}/>
            <SidebarRecordDetails/>
            <Toaster />
        </div>
    );
};
