import React from 'react';
import {columns, DataTable} from "@/components/DataTable";
import {useStore} from "@/store";

export const PlantListPage = () => {
    const plants = useStore((state) => state.plants);
    return (
        <div className="">
            <DataTable columns={columns} data={plants}/>
        </div>
    );
};
