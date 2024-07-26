import React from 'react';
import {Logo} from "@/components/Logo";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {NavLink} from "react-router-dom";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {SettingsButton} from "@/components/SettingsButton";
import {useStore} from "@/store";

export const Header = () => {
    const sidebarCreate = useStore(state => state.sidebarCreate);
    return (
        <div className="flex justify-between h-16">
            <Logo/>
            <div className="flex-1 px-5">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavLink to="/main_window" end>
                                {({isActive}) => (
                                    <div>
                                        <div
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                {
                                                    'bg-stone-100': isActive
                                                }
                                            )}>
                                            Список
                                        </div>

                                        <Button variant="default" className={cn(
                                            "ml-2 bg-green-600 hover:bg-green-700 absolute opacity-0 -translate-x-1/3 transition-all duration-500",
                                            isActive && "opacity-100 translate-x-0 static"
                                        )}
                                                onClick={sidebarCreate}
                                        >Добавить запись</Button>
                                    </div>
                                )}
                            </NavLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <SettingsButton/>
        </div>
    );
};
