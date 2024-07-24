import {createBrowserRouter} from "react-router-dom";
import {LayoutPage, PlantListPage} from "@/pages";


export const router = createBrowserRouter([
    {
        path: "/main_window",
        element: <LayoutPage/>,
        children: [
            {
                path: "/main_window",
                element: <PlantListPage/>
            },
            {
                index: true,
                path: "/main_window/a",
                element: <div>dfsdfsdfsd</div>
            }
        ]
    }
]);
