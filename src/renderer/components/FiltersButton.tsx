import React from 'react';
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Table} from "@tanstack/react-table";
import {MixerVerticalIcon} from "@radix-ui/react-icons";

interface FiltersButtonProps<TData> {
    table: Table<TData>
}

export const FiltersButton = <TData,>({table}: FiltersButtonProps<TData>) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-1" size="icon"><MixerVerticalIcon/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem>
                    <DropdownMenuLabel>Фильтр</DropdownMenuLabel>

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
