import React from 'react';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface MGSelectProps {
    items: (string | number)[]
    className?: string
    disabled?: boolean
    value?: string
    onValueChange?: (value: string) => void
}

export const MGSelect = ({items, ...props}: MGSelectProps) => {
    return (
        <Select {...props}>
            <SelectTrigger className={props?.className}>
                <SelectValue placeholder="-"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="-">-</SelectItem>
                {items.map(value => (
                    <SelectItem key={value} value={value.toString()}>{value}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
