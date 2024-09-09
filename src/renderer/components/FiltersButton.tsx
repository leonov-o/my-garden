import React from 'react';
import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Table} from "@tanstack/react-table";
import {MixerVerticalIcon} from "@radix-ui/react-icons";
import {FieldDef, fields} from "@/lib/FieldDef";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {Plant, useStore} from "@/store";
import {getMaxValue, getUniqueValues, getUniqueValuesFromList} from "@/lib/utils";
import {MGSelect} from "@/components/MGSelect";

interface FiltersButtonProps<TData> {
    table: Table<TData>
}

export const FiltersButton = <TData, >({table}: FiltersButtonProps<TData>) => {
    const plants = useStore(state => state.plants);

    const renderField = (field: FieldDef) => {
        const column = table.getColumn(field.name);

        switch (field.type) {
            case 'string':
            case 'select':
            case 'select-new': {
                const items = getUniqueValues(plants, field.name as keyof Plant);
                return <MGSelect className="w-52" items={items} value={column.getFilterValue() as string || "-"}
                                 onValueChange={(value) => column.setFilterValue(value === '-' ? undefined : value)}
                                 disabled={!items || items.length === 0} key={field.name}/>;
            }
            case 'string[]': {
                const items = getUniqueValuesFromList(plants, field.name as keyof Plant);
                return <MGSelect className="w-52" items={items} value={column.getFilterValue() as string || "-"}
                                 onValueChange={(value) => column.setFilterValue(value === '-' ? undefined : value)}
                                 disabled={!items || items.length === 0} key={field.name}/>;
            }
            case 'number': {
                const maxValue = getMaxValue(plants, field.name as keyof Plant);
                const filterValue = column.getFilterValue() as number[];

                const min = field.sidebarDisplay.min || 0;
                const max = maxValue || field.sidebarDisplay.max || 30;

                return (
                    <div className="flex">
                        <Slider
                            value={filterValue}
                            onValueChange={(values) => column.setFilterValue(values)}
                            minStepsBetweenThumbs={1}
                            min={min}
                            max={max}
                            className="w-32"
                            step={field.sidebarDisplay.step}
                            formatLabel={(value) => `${value}`}
                        />
                    </div>
                );
            }
            default:
                return null;
        }
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-1" size="icon"><MixerVerticalIcon/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-wrap justify-between w-[450px] p-3" align="start">
                {
                    fields.filter(field => field.filter).map(field => {
                        return (

                            <div key={field.name} className="">
                                <Label
                                    htmlFor={field.name}>{field.displayName + (field.postfix ? `, ${field.postfix}` : "")}</Label>
                                {renderField(field)}
                            </div>
                        )
                    })
                }
                <Button className="w-full mt-2" variant="outline" onClick={() => table.resetColumnFilters()}>Сбросить
                    фильтры</Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
