import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(location.hash);

  const menuItems = [
    { name: "Home", href: "#hero" },
    { name: "Features", href: "#features" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
    { name: "Loan Status", href: "/process" },
    { name: "Financial Summary", href: "/financial-summary" },
  ];

  return (
    <div>
      <header
        id="header"
        className="header d-flex align-items-center sticky-top mt-0"
      >
        <div
          className="header-container container-fluid container-2xl position-relative d-flex align-items-center justify-content-between gap-10 bg-[#e5e9ff]"
          style={{ background: "#e5e9ff" }}
        >
          <a
            href="/"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            <div>
              {/* <img
                src="/assets/img/happilogo.png"
                alt=""
                width={80}
                height={180}
                className="ml-8"
              /> */}
            </div>
          </a>
          {/* 4c45a5 */}
          <nav id="navmenu" className="navmenu">
            <ul>
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <div className="d-flex flex-col gap-0 text-center pr-12">
            <a
              className="btn-getstarted py-2 text-decoration-none border border-white rounded-0 w-full mr-10"
              href="/signIn"
            >
              Sign In
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
