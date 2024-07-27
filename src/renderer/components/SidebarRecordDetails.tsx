import React, {useEffect, useState} from 'react';
import {Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {Plant, useStore} from "@/store";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {FieldDef} from "@/lib/FieldDef";

interface SidebarRecordDetailsProps {
    fields: FieldDef[]
}

interface FormDataObject {
    [key: string]: FormDataEntryValue;
}

export const SidebarRecordDetails = ({fields} : SidebarRecordDetailsProps) => {
    const isSidebarOpen = useStore(state => state.isSidebarOpen);
    const sidebarClose = useStore(state => state.sidebarClose);
    const sidebarMode = useStore(state => state.sidebarMode);
    const selectedRecord = useStore(state => state.selectedPlant);
    const addPlant = useStore(state => state.addPlant);
    const updatePlant = useStore(state => state.updatePlant);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        setImagePreview(null)
        if (selectedRecord) {
            if(selectedRecord.image){
                setImagePreview(selectedRecord.image);
            }
        }
    }, [selectedRecord]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data: FormDataObject = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        const plantData = data as unknown as Plant;
        plantData.image = imagePreview

        if (sidebarMode === "create") {
            addPlant(plantData);
        } else if (sidebarMode === "update") {
            plantData.id = selectedRecord.id
            updatePlant(plantData);
        }
        sidebarClose();
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const renderField = (field: FieldDef) => {
        const commonProps = {
            id: field.name,
            name: field.name,
            required: field.sidebarDisplay.required,
            disabled: sidebarMode === 'read',
            defaultValue: selectedRecord?.name || ''
        };

        switch (field.type) {
            case 'string':
                return <Input key={field.name} type="text" {...commonProps} />;
            case 'number':
                return <Input key={field.name} type="number" min={field.sidebarDisplay.min} step={field.sidebarDisplay.step} {...commonProps} />;
            case 'image':
                return (
                    <div key={field.name} className="relative w-72 h-72 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
                        <input id={field.name} name={field.name} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        {sidebarMode !== 'read' && (
                            <label htmlFor={field.name} className="absolute z-10 inset-0 bg-green-600 bg-opacity-75 text-white flex items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                Выберите изображение
                            </label>
                        )}
                        {imagePreview && <img src={imagePreview} alt="Image Preview" className="absolute inset-0 object-cover w-full h-full" />}
                    </div>
                );
            case 'textarea':
                return <Textarea key={field.name} className="min-h-[100px]" {...commonProps} />;
            default:
                return null;
        }
    };

    const groupFields = (fields: FieldDef[]) => {
        return fields.filter(field => field.sidebarDisplay.display).reduce((acc: {
            [key: number]: FieldDef[]
        }, field) => {
            const group = field.sidebarDisplay.group || 0;
            if (!acc[group]) {
                acc[group] = [];
            }
            acc[group].push(field);

            if(field.sidebarDisplay.cols){
                acc[group].length = field.sidebarDisplay.cols
            }

            return acc;
        }, {});
    };

    const groupedFields = groupFields(fields);

    return (
        <Sheet  open={isSidebarOpen} onOpenChange={sidebarClose}>
            <SheetContent  side="left"
                className="w-[400px] sm:w-[500px] sm:max-w-none md:w-[600px] md:max-w-none lg:w-[700px] lg:max-w-none xl:w-[800px] xl:max-w-none overflow-auto">
                <SheetHeader>
                    <SheetTitle>{sidebarMode === "read" ? "Просмотр записи" : sidebarMode === "create" ? "Создание записи" : "Редактирование записи"}</SheetTitle>
                </SheetHeader>
                <SheetDescription/>
                <div className="flex-1 p-4">
                    <div className="max-w-4xl mx-auto">
                        <form className="grid gap-6" onSubmit={handleSubmit}>
                            {Object.keys(groupedFields).map(group => {
                                const groupFields = groupedFields[parseInt(group)];
                                const cols = groupFields.length;

                                return (
                                    <div key={group} className={`grid grid-cols-${cols} gap-4`}>
                                        {groupFields.map(field => (
                                            <div key={field.name} className="grid gap-2">
                                                <Label htmlFor={field.name}>{field.displayName}</Label>
                                                {renderField(field)}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                            <SheetFooter aria-describedby="SheetDescription">
                                {
                                    sidebarMode !== "read" && (
                                        <div className="flex justify-end gap-2">
                                            <Button type="button" variant="outline"
                                                    onClick={sidebarClose}>Отмена</Button>
                                            <Button type="submit"
                                                    className="bg-green-600 hover:bg-green-700">{sidebarMode === "create" ? "Создать запись" : "Сохранить изменения"}</Button>
                                        </div>
                                    )
                                }
                            </SheetFooter>
                        </form>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
