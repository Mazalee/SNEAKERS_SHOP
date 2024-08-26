"use client";

import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../public/images/logo.svg";
import Close from "../../public/images/icon-close.svg";
import Open from "../../public/images/icon-menu.svg";
import Image from "next/image";

const links = [
  { href: "/collections", label: "collections" },
  { href: "/men", label: "men" },
  { href: "/women", label: "women" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

const NavLeft = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
      <div
        className={`sidebar ${
          isSidebarOpen ? "sidebar-visible" : "sidebar-invisible"
        }`}
      >
        <nav className="mobile-nav">
          <ul>
            {links.map((link) => (
              <Link
                className="mobile-links"
                onClick={() => setIsSidebarOpen(false)}
                key={link.href}
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </nav>
      </div>

      <div className="nav-left">
        {isSidebarOpen && (
          <div className="close-icon-container" onClick={toggleSidebar}>
            <Image src={Close} alt="close" className="close-icon" />
          </div>
        )}

        <div className="mobile-menu" onClick={toggleSidebar}>
          {!isSidebarOpen && (
            <Image src={Open} alt="open" className="open-icon" />
          )}
        </div>

        <div className="logo">
          <Link href="/">
            <Image src={Logo} alt="logo" className="logo-icon" />
          </Link>
        </div>

        <div className="links-container">
          <ul>
            {links.map((link) => {
              return (
                <li key={link.label}>
                  <Link className="links" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavLeft;
