import React, { JSX, ReactNode} from "react";
import {classNames} from "@/utils/styleUtils";

export interface TypographyProps {
    children:string | JSX.Element | JSX.Element[] | (() => JSX.Element) | ReactNode,
    className?:string
}

export interface LabelProps extends TypographyProps {
    htmlFor?:string
}

export const H1 = ({children,className}:TypographyProps) => {
    return <h1 className={classNames("text-primary dark:text-dark-primary text-5xl font-normal my-4",className)}>
        {children as ReactNode}
    </h1> ;
};

export const H2 = ({children,className}:TypographyProps) => {
    return <h2 className={classNames("text-2xl text-secondary dark:text-dark-secondary font-normal my-4",className)}>
        {children as ReactNode}
    </h2> ;
};

export const H3 = ({children,className}:TypographyProps) => {
    return <h3 className={classNames("text-primary dark:text-dark-primary font-light text-3xl my-4",className)}>
        {children as ReactNode}
    </h3> ;
};

export const P = ({children,className}:TypographyProps) => {
    return <p className={classNames("text-xl text-secondary dark:text-dark-secondary",className)}>
        {children as ReactNode}
    </p> ;
};

export const Label = ({children,className,htmlFor}:LabelProps) => {
    return <label className={classNames("text-xl text-primary dark:text-dark-primary",className)} htmlFor={htmlFor}>
        {children as ReactNode}
    </label> ;
};

export const Span = ({children,className}:TypographyProps) => {
    return <span className={classNames("text-xl text-secondary dark:text-dark-secondary",className)} >
        {children as ReactNode}
    </span> ;
};

export const HR = () => {
    return <hr className="text-secondary dark:text-dark-secondary opacity-25"/>;
};



