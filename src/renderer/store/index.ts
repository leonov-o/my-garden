import {create} from 'zustand'
import {immer} from "zustand/middleware/immer";
import {persist} from 'zustand/middleware'

export interface Plant {
    id: number
    name: string // Название растения
    category: string // Категория
    kind: string // Вид
    count: number // Количество
    description: string // Описание
    image: string // Изображение
    width: number // Ширина
    height: number // Высота
    crownShape: string // Форма кроны
    foliageColor: string // Цвет листьев
    growthRate: string // Скорость роста
    crownTexture: string // Фактура кроны
    floweringPeriod: string // Период цветения
    flowerColor: string // Цвет цветка
    lightPreference: string // Требования к свету
    waterPreference: string //  Требования к влаге
}

interface Store {
    plants: Plant[]
    columnVisibility: Record<string, boolean>
    isSidebarOpen: boolean
    sidebarMode: "create" | "read" |  "update"
    selectedPlant: Plant | null
    toastMessage: string
    errors: string
    setToastMessage: (message: string) => void
    setColumnVisibility: (columnVisibility: () => Record<string, boolean>) => void
    sidebarCreate: () => void
    sidebarRead: (id: number) => void
    sidebarUpdate: (id: number) => void
    sidebarClose: () => void
    addPlant: (plant: Plant) => void
    updatePlant: (plant: Plant) => void
    deletePlant: (id: number) => void
}

export const useStore = create<Store>()(immer(persist((set) => ({
    plants: [],
    columnVisibility: {},
    isSidebarOpen: false,
    sidebarMode: "read",
    selectedPlant: null,
    toastMessage: "",
    errors: "",
    setToastMessage: (message) => set(state => {
        state.toastMessage = message
    }),
    setColumnVisibility: (columnVisibility) => set(state => {
        state.columnVisibility = {...state.columnVisibility, ...columnVisibility()}
    }),
    sidebarCreate: () => set(state => {
        state.selectedPlant = null
        state.sidebarMode = "create"
        state.isSidebarOpen = true
    }),
    sidebarRead: (id: number) => set(state => {
        state.selectedPlant = state.plants.find(plant => plant.id === id)
        state.sidebarMode = "read"
        state.isSidebarOpen = true
    }),
    sidebarUpdate: (id: number) => set(state => {
        state.selectedPlant = state.plants.find(plant => plant.id === id)
        state.sidebarMode = "update"
        state.isSidebarOpen = true
    }),
    sidebarClose: () => set(state => {
        state.isSidebarOpen = false
    }),
    addPlant: (plant: Plant) => set(state => {
        state.plants.push({
            ...plant,
            id: Math.max(0, ...state.plants.map(plant => plant.id)) + 1,
            width: Number(plant.width),
            height: Number(plant.height),
            count: Number(plant.count),
        })
        state.toastMessage = "Запись добавлена"
    }),
    updatePlant: (plant: Plant) => set(state => {
        state.plants = state.plants.map(p => p.id === plant.id ? plant : p)
        state.toastMessage = "Запись обновлена"
    }),
    deletePlant: (id: number) => set(state => {
        state.plants = state.plants.filter(plant => plant.id !== id)
        state.toastMessage = "Запись удалена"
    }),
}), {
    name: 'store',
    partialize: (state) =>
        Object.fromEntries(
            Object.entries(state).filter(([key]) => ['plants', "columnVisibility"].includes(key)),
        ),
})));
