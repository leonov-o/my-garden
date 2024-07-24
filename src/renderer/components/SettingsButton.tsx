import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {DownloadIcon, GearIcon, UploadIcon} from "@radix-ui/react-icons";

export const SettingsButton = () => {
    return (
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <GearIcon className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full p-2" align="end">
                    <DropdownMenuItem>
                        <DownloadIcon className="mr-2 h-4 w-4"/> Импорт из Excel
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <UploadIcon className="mr-2 h-4 w-4"/> Экспорт из Excel
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
