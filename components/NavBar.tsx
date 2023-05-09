"use client";

import React, {useState} from 'react';
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import NameLogo from "@/components/NameLogo";

const NavBar = () => {
  const [navIsOpen,setNavIsOpen] = useState<boolean>(false);

  const toggleMobileNav = () => {
    navIsOpen ? document.body.removeAttribute("style")
      : document.body.setAttribute("style","overflow-y:hidden");
    setNavIsOpen(!navIsOpen);
  };

  return (
    <nav className={`nav ${(navIsOpen && "active").toString()}`}>
      <Link href="/">
        <NameLogo />
      </Link>
      <span className='navLink'><Link href="/">Home</Link></span>
      <button className={`toggle-btn ${navIsOpen && "active"}`} onClick={toggleMobileNav}>
        <div  className="toggle-btn__shape"></div>
      </button>
      <ThemeToggle />
    </nav>
  );
};

export default NavBar;