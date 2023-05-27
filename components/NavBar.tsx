"use client";

import React, {useEffect, useState} from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import NameLogo from "@/components/NameLogo";
import {classNames, conditional} from "@/utils/styleUtils";
import {usePathname} from "next/navigation";

const NavBar = () => {
    const pathname = usePathname();
    const [navIsOpen,setNavIsOpen] = useState<boolean>(false);
    const toggleMobileNav = () => {
        navIsOpen ? document.body.removeAttribute("style")
            : document.body.setAttribute("style","overflow-y:hidden");
        setNavIsOpen(!navIsOpen);
    };
    
    useEffect(()=> {
        const close = (event:MouseEvent) => {
            if(!(event.target instanceof HTMLButtonElement) && !(event.target instanceof HTMLSpanElement))
                setNavIsOpen(false);
        };
        if(navIsOpen) {
            window.addEventListener("click",close);
        }
        return ()=> window.removeEventListener("click",close);
    });

    return (
        <nav className={classNames(
            "flex bg-nav dark:bg-dark-nav flex-col gap-12 z-10 h-[82px]",
            conditional(navIsOpen,"absolute pt-[10vh] h-full w-full flex"),
            "lg:flex-row lg:w-full lg:items-center lg:justify-end lg:pr-[2.5%] lg:m-0"
        )}>
            <Link href="/">
                <NameLogo />
            </Link>
            <Link className={classNames(
                "ml-8 text-2xl text-primary dark:text-dark-primary",
                conditional(navIsOpen,"block", "hidden lg:block"),
                conditional(pathname === "/","hidden lg:hidden")
            )} 
            href="/">
                Home
            </Link>
            <button 
                onClick={toggleMobileNav}
                className="flex w-[40px] h-[25px] pt-[2px] absolute right-8 top-8 cursor-pointer lg:hidden"
            >
                <div
                    className={classNames(
                        "inline-block w-[40px] bg-primary dark:bg-dark-primary transition translate-y-[8px]",
                        "after:content-[' '] after:flex after:h-[4px] after:min-w-[40px]",
                        "after:bg-primary after:dark:bg-dark-primary",
                        "after:translate-y-[8px] after:transition after:ease-in-out",
                        "before:content-[' '] before:flex before:h-[4px] before:min-w-[40px]",
                        "before:bg-primary before:dark:bg-dark-primary",
                        "before:translate-y-[-12px] before:ease-in-out before:transition",
                        conditional(
                            navIsOpen,
                            "h-0 after:rotate-45 after:translate-y-[-3px] before:-rotate-45 before:translate-y-[0px]",
                            "h-[4px]"
                        )
                    )}>
                </div>
            </button>
            <ThemeToggle navIsOpen={navIsOpen}/>
        </nav>
    );
};

export default NavBar;