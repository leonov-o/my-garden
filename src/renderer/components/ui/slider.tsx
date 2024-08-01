import React, { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = {
    className?: string;
    min: number;
    max: number;
    minStepsBetweenThumbs: number;
    step: number;
    formatLabel?: (value: number) => string;
    value?: number[] | readonly number[];
    onValueChange?: (values: number[]) => void;
};

const Slider = React.forwardRef(
    (
        {
            className,
            min,
            max,
            step,
            formatLabel,
            value,
            onValueChange,
            ...props
        }: SliderProps,
        ref
    ) => {
        const initialValue = Array.isArray(value) ? value : [min, max];

        return (
            <SliderPrimitive.Root
                ref={ref as React.RefObject<HTMLDivElement>}
                min={min}
                max={max}
                step={step}
                value={initialValue}
                onValueChange={onValueChange}
                className={cn(
                    "relative flex w-full touch-none select-none mb-6 items-center",
                    className
                )}
                {...props}
            >
                <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-green-600/20">
                    <SliderPrimitive.Range className="absolute h-full bg-green-600" />
                </SliderPrimitive.Track>
                {initialValue.map((value, index) => (
                    <React.Fragment key={index}>
                        <div
                            className="absolute text-center "
                            style={{
                                left: `calc(${((value - min) / (max - min)) * 91}% + 0px)`,
                                top: `10px`,
                            }}
                        >
              <span className="text-sm">
                {formatLabel ? formatLabel(value) : value}
              </span>
                        </div>
                        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-green-600/50 bg-green-600 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none" />
                    </React.Fragment>
                ))}
            </SliderPrimitive.Root>
        );
    }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
