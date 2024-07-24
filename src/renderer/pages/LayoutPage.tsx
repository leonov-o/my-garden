import React from 'react';
import {Outlet} from "react-router-dom";
import {Header} from "@/components/Header";

export const LayoutPage = () => {
    return (
        <div className="p-3">
            <Header/>
            <Outlet/>
        </div>
    );
};
