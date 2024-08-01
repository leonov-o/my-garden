import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {Plant} from "@/store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getMaxValue = (plants: Plant[], field: keyof Plant): number => {
  const values = plants.map(plant => plant[field]) as number[];
  return Math.max(...values);
};
export const getUniqueValues = (plants: Plant[], field: keyof Plant, refField?: keyof Plant, refValue?: string) => {
  let filteredPlants = plants;

  if (refField && refValue) {
    filteredPlants = plants.filter(plant => plant[refField] === refValue);
  }

  const values = filteredPlants.map(plant => plant[field]);
  return Array.from(new Set(values)).filter(value => value);
};
