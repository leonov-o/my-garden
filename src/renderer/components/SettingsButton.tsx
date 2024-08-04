import React, {useRef} from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub,
    DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {DownloadIcon, GearIcon, UploadIcon} from "@radix-ui/react-icons";
import {useStore} from "@/store";

export const SettingsButton = () => {
    const plants = useStore(state => state.plants);
    const setPlants = useStore(state => state.setPlants);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target?.result as string);
                setPlants(data);

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            };
            reader.readAsText(file);
        }
    };

    const handleExport = () => {
        const blob = new Blob([JSON.stringify(plants, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mg-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <GearIcon className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full p-2" align="end">
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <DownloadIcon className="mr-2 h-4 w-4"/> Импорт
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                                    .json
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <UploadIcon className="mr-2 h-4 w-4"/> Экспорт
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={handleExport}>.json</DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
            <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImport}
            />
        </div>
    );
};
