import {FilterFn} from "@tanstack/react-table";
import {Plant} from "@/store";
import {FilterFnOption} from "@tanstack/table-core/src/features/ColumnFiltering";

interface ISidebar {
    display: boolean
    index?: number
    group?: number
    cols?: number
    required?: boolean
    min?: number
    max?: number
    step?: number
}

interface IGroupedData {
    [key: string]: string[]
}

export interface FieldDef {
    name: string
    displayName: string
    type: "number" | "string" | "string[]" | "string-grouped" | "select" | "select-new" | "textarea" | "image",
    groupedData?: IGroupedData,
    ref?: string
    display?: boolean
    nullValue?: string
    postfix?: string
    sidebarDisplay: ISidebar
    filter?: boolean
    filterFn?: FilterFn<Plant> | FilterFnOption<Plant>,
    selectValues?: string[]
}

export const fields: FieldDef[] = [
    {
        name: "id",
        displayName: "№",
        type: "number",
        display: true,
        sidebarDisplay: {
            display: false
        }
    },
    {
        name: "image",
        displayName: "Изображение",
        type: "image",
        sidebarDisplay: {
            display: true,
            group: 0
        }
    },
    {
        name: "name",
        displayName: "Название",
        type: "string",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 1,
            required: true
        }
    },
    {
        name: "description",
        displayName: "Описание",
        type: "textarea",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 2
        },
        nullValue: "-"
    },
    {
        name: "width",
        displayName: "Ширина",
        type: "number",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 3,
            min: 0,
            max: 10,
            step: 0.1
        },
        filter: true,
        nullValue: "-",
        postfix: "м"
    },
    {
        name: "height",
        displayName: "Высота",
        type: "number",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 3,
            min: 0,
            max: 10,
            step: 0.1
        },
        filter: true,
        nullValue: "-",
        postfix: "м"
    },
    {
        name: "count",
        displayName: "Количество",
        type: "number",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 3,
            min: 0
        },
        filter: true,
        nullValue: "-",
        postfix: "шт"
    },
    {
        name: "category",
        displayName: "Категория",
        type: "select-new",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 4
        },
        filter: true
    },
    {
        name: "kind",
        ref: "category",
        displayName: "Вид",
        type: "select-new",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 4
        },
        filter: true
    },
    {
        name: "crownShape",
        displayName: "Форма кроны",
        type: "select-new",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 5
        },
        filter: true,
        nullValue: "-"
    },
    {
        name: "crownTexture",
        displayName: "Фактура кроны",
        type: "select-new",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 5
        },
        filter: true,
        nullValue: "-"
    },
    {
        name: "foliageColor",
        displayName: "Цвет листьев",
        type: "string",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 6
        },
        filter: true,
        nullValue: "-"
    },
    {
        name: "flowerColor",
        displayName: "Цвет цветка",
        type: "string-grouped",
        groupedData: {
            "Теплые": ["оранжевый", "желтый", "красный", "розовый", "коричневый", "бежевый"],
            "Холодные": ["синий", "голубой", "фиолетовый", "сиреневый", "зеленый"],
            "Белый": ["белый"]
        },
        display: true,
        sidebarDisplay: {
            display: true,
            group: 6
        },
        filter: true,
        nullValue: "-"
    },
    {
        name: "floweringPeriod",
        displayName: "Период цветения",
        type: "string[]",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 7
        },
        filter: true,
        nullValue: "-"
    },
    {
        name: "growthRate",
        displayName: "Скорость роста",
        type: "select",
        selectValues: ["Быстрорастущие", "Среднерастущие", "Медленнорастущие", "Карликовые"],
        display: true,
        sidebarDisplay: {
            display: true,
            group: 7
        },
        filter: true,
        nullValue: "-"
    },
    {
        name: "lightPreference",
        displayName: "Место посадки",
        type: "select",
        selectValues: ["Свет", "Свет | Тень", "Тень"],
        display: true,
        sidebarDisplay: {
            display: true,
            group: 8
        },
        filter: true,
        nullValue: "-",
    },
    {
        name: "waterPreference",
        displayName: "Требования к влаге",
        type: "select",
        selectValues: ["Засухоустойчивые", "Достаточное увлажнение", "Влаголюбивые"],
        display: true,
        sidebarDisplay: {
            display: true,
            group: 8
        },
        filter: true,
        nullValue: "-"
    },
    {
        name: "soilPreference",
        displayName: "Почва",
        type: "select-new",
        display: true,
        sidebarDisplay: {
            display: true,
            group: 9,
            cols: 2
        },
        filter: true,
        nullValue: "-"
    }
];
