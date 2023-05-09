import Link from 'next/link';
import React, { MouseEventHandler } from 'react';

type StyledLinkProps = {
    children: string,
    href:string
}

const StyledLink = ({children, href}:StyledLinkProps) => {

    return (
        <Link
            href={href}
            className="styled-link"
        >
            {children}
        </Link>
    );
};

export default StyledLink;