import Link from "next/link";
import React from "react";
import {classNames} from "@/utils/styleUtils";

type StyledLinkProps = {
    children: string,
    href:string
}

const StyledLink = ({children, href}:StyledLinkProps) => {
    return (
        <Link
            href={href}
            className={classNames(
                "text-2xl block w-fit border-primary dark:border-dark-primary border-2 rounded-lg px-4 py-2",
                "text-primary dark:text-dark-primary lowercase",
                "hover:bg-accent hover:text-itemSelected hover:no-underline"
            )}
        >
            {children}
        </Link>
    );
};

export default StyledLink;