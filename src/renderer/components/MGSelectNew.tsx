import React, {useState} from 'react';
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {CounterClockwiseClockIcon, PlusIcon} from "@radix-ui/react-icons";

interface MGSelectNewProps {
    items: (string | number)[]
    disabled?: boolean
    value?: string
    onValueChange?: (value: string) => void
}

export const MGSelectNew = ({items, disabled, ...props}: MGSelectNewProps) => {
    const [isAdding, setIsAdding] = useState(false);

    const handleSwitch = () => {
        if(!isAdding) {
            props?.onValueChange("-");
        }
        setIsAdding(!isAdding);
    };

    return (
        <div className="flex">
            {
                isAdding
                    ? <Input type="text" disabled={disabled} {...props} />
                    : <Select disabled={disabled} {...props}>
                        <SelectTrigger>
                            <SelectValue placeholder="-"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="-">-</SelectItem>
                            {items.map(value => (
                                <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
            }
            <Button type="button" variant="outline" className="ml-1" size="icon"
                    onClick={handleSwitch} disabled={disabled}>{isAdding ? <CounterClockwiseClockIcon/> :
                <PlusIcon/>}</Button>
        </div>
    );
};
