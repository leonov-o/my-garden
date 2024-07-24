import React from 'react';
import {Logo} from "@/components/Logo";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {NavLink} from "react-router-dom";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {DownloadIcon, GearIcon, UploadIcon} from "@radix-ui/react-icons";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {SettingsButton} from "@/components/SettingsButton";

export const Header = () => {
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
                                        <NavigationMenuLink
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                {
                                                    'bg-stone-100': isActive
                                                }
                                            )}>
                                            Список
                                        </NavigationMenuLink>

                                        <Button variant="default" className={cn(
                                            "ml-2 bg-green-600 hover:bg-green-700 absolute opacity-0 -translate-x-1/3 transition-all duration-500",
                                            isActive && "opacity-100 translate-x-0 static"
                                        )}>Добавить запись</Button>


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
