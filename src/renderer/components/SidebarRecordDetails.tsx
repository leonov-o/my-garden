import React, {useEffect, useState} from 'react';
import {Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle} from "@/components/ui/sheet";
import {Plant, useStore} from "@/store";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

interface FormDataObject {
    [key: string]: FormDataEntryValue;
}

export const SidebarRecordDetails = () => {
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
                            <div className="grid gap-2">
                                <Label>Изображение</Label>
                                <div
                                    className="relative w-72 h-72 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    {
                                        sidebarMode !== "read" && (
                                            <label
                                                htmlFor="image"
                                                className="absolute z-10 inset-0 bg-green-600 bg-opacity-75 text-white flex items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                                Выберите изображение
                                            </label>
                                        )
                                    }
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Image Preview"
                                            className="absolute inset-0 object-cover w-full h-full"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Название</Label>
                                <Input id="name" name="name" required disabled={sidebarMode === "read"}
                                       defaultValue={selectedRecord?.name || ''}/>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Описание</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    className="min-h-[100px]"
                                    disabled={sidebarMode === "read"}
                                    defaultValue={selectedRecord?.description || ''}
                                />
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="width">Ширина</Label>
                                    <Input id="width" name="width" type="number" min={0} step={0.01}
                                           disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.width || ''}/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="height">Высота</Label>
                                    <Input id="height" name="height" type="number" min={0} step={0.01}
                                           disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.height || ''}/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="height">Количество</Label>
                                    <Input id="count" name="count" type="number" min={0}
                                           disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.height || ''}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="crownShape">Форма кроны</Label>
                                    <Input id="crownShape" name="crownShape" disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.crownShape || ''}/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="crownTexture">Фактура кроны</Label>
                                    <Input id="crownTexture" name="crownTexture" disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.crownTexture || ''}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="foliageColor">Цвет листьев</Label>
                                    <Input id="foliageColor" name="foliageColor" disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.foliageColor || ''}/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="flowerColor">Цвет цветка</Label>
                                    <Input id="flowerColor" name="flowerColor" disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.flowerColor || ''}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="growthRate">Скорость роста</Label>
                                    <Input id="growthRate" name="growthRate" disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.growthRate || ''}/>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="floweringPeriod">Период цветения</Label>
                                    <Input id="floweringPeriod" name="floweringPeriod" disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.floweringPeriod || ''}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="lightPreference">Предпочтение освещения</Label>
                                    <Input id="lightPreference" name="lightPreference" disabled={sidebarMode === "read"}
                                           defaultValue={selectedRecord?.lightPreference || ''}/>
                                </div>
                            </div>
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
