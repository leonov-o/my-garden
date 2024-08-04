import {createHashRouter} from "react-router-dom";
import {LayoutPage, PlantListPage} from "@/pages";


export const router = createHashRouter([
    {
        path: "/",
        element: <LayoutPage/>,
        children: [
            {
                path: "/",
                element: <PlantListPage/>
            },
            {
                index: true,
                path: "/a",
                element: <div>dfsdfsdfsd</div>
            }
        ]
    }
]);
