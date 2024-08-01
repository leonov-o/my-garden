
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

export interface FieldDef {
    name: string
    displayName: string
    type: "number" | "string" | "select" | "select-new" | "textarea" | "image"
    ref?: string
    display?: boolean
    nullValue?: string
    postfix?: string
    sidebarDisplay: ISidebar
    filter?: boolean
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
        name: "floweringPeriod",
        displayName: "Период цветения",
        type: "string",
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
        displayName: "Требования к свету",
        type: "select",
        selectValues: ["Светолюбивые", "Теневыносливые", "Тенелюбивые"],
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
    }
]
