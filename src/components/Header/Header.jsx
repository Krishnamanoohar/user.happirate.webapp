import { Context } from "@/App";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { showSignInPopup, setShowSignInPopup } = useContext(Context);

  const menuItems = [
    { name: "Solutions", href: "#solutions" },
    { name: "Get In Touch", href: "#get-in-touch" },
    { name: "Blog", href: "#blog" },
    { name: "EMI Calculator", href: "/emi-calculator" },
    // { name: "Our Story", href: "/our-story" },
    // { name: "Home", href: "#hero" },
    // { name: "Features", href: "#features" },
    // { name: "Services", href: "#services" },
    // { name: "Loan Status", href: "/process" },
    // { name: "Financial Summary", href: "/financial-summary" },
  ];

  return (
    <div>
      <header
        id="header"
        className="header d-flex align-items-center sticky-top mt-0"
      >
        <div className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between gap-12 bg-[#e5e9ff]">
          <a
            href="/"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            <div>
              <img
                src="/assets/img/logo5.png"
                alt=""
                width={100}
                // height={880}
                // className="ml-8"
              />
            </div>
          </a>

          <nav id="navmenu" className="navmenu grow-1">
            <ul className="flex justify-evenly">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a href={item.href}>{item.name}</a>
                </li>
              ))}
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <div className="sign-in d-flex flex-col gap-0 text-center w-[10rem] sing-in-btn">
            {/* <a
              className="btn-getstarted py-2 text-decoration-none border border-white rounded-0 w-full mr-10"
              href="/signIn"
            >
              Sign In
            </a> */}
            <button
              href="compare-loans"
              className="w-full flex text-center content-center vibrant-shadow-btn px-4 btn"
              onClick={() => setShowSignInPopup(true)}
            >
              Sign In
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
