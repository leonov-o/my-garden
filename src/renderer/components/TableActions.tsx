import React from 'react';
import {useStore} from "@/store";
import {Button} from "@/components/ui/button";
import {EyeOpenIcon, Pencil1Icon, TrashIcon} from "@radix-ui/react-icons";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface TableActionsProps {
    id: number
}

export const TableActions = ({id}: TableActionsProps) => {
    const sidebarRead = useStore(state => state.sidebarRead);
    const sidebarUpdate = useStore(state => state.sidebarUpdate);
    const deletePlant = useStore(state => state.deletePlant);

    return (
        <div className="flex space-x-1">
            <Button variant="outline" size="icon" onClick={() => sidebarRead(id)}><EyeOpenIcon/></Button>
            <Button variant="outline" size="icon" onClick={() => sidebarUpdate(id)}><Pencil1Icon/></Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon"><TrashIcon/></Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы точно хотите удалить эту запись?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-500 hover:bg-red-600" onClick={() => deletePlant(id)}>
                            Удалить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
