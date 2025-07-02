import React from "react";

const Header = () => {
  return (
    <div>
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
      >
        <div
          className="header-container container-fluid container-xl position-relative d-flex align-items-center justify-content-between bg-[#e5e9ff]"
          style={{ background: "#e5e9ff" }}
        >
          <a
            href="/"
            className="logo d-flex align-items-center me-auto me-xl-0"
          >
            {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
            {/* <img src="assets/img/logo.png" alt=""/>  */}
            {/* <h1 className="sitename">HAPPI₹ATE</h1> */}
            <div>
              {/* <img src="/assets/img/happirateLogo2.jpg" alt="" width={200} /> */}
            </div>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li>
                <a href="#hero" className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              {/* <li>
                <a href="#about">About</a>
              </li> */}
              {/* <li>
                <a href="#services">Services</a>
              </li> */}
              {/* <li>
                <a href="#pricing">Pricing</a>
              </li> */}
              {/* <li className="dropdown">
                <a href="#">
                  <span>Dropdown</span>
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li>
                    <a href="#">Dropdown 1</a>
                  </li>
                  <li className="dropdown">
                    <a href="#">
                      <span>Deep Dropdown</span>
                      <i className="bi bi-chevron-down toggle-dropdown"></i>
                    </a>
                    <ul>
                      <li>
                        <a href="#">Deep Dropdown 1</a>
                      </li>
                      <li>
                        <a href="#">Deep Dropdown 2</a>
                      </li>
                      <li>
                        <a href="#">Deep Dropdown 3</a>
                      </li>
                      <li>
                        <a href="#">Deep Dropdown 4</a>
                      </li>
                      <li>
                        <a href="#">Deep Dropdown 5</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Dropdown 2</a>
                  </li>
                  <li>
                    <a href="#">Dropdown 3</a>
                  </li>
                  <li>
                    <a href="#">Dropdown 4</a>
                  </li>
                </ul>
              </li> */}
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li>
                <a href="/process">Loan Status</a>
              </li>
              <li>
                <a href="/financial-summary">Financial Summary</a>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <div className="d-flex flex-row gap-0">
            <a className="btn-getstarted gradient-button" href="/signIn">
              Sign In
            </a>
            <a
              className="btn-getstarted gradient-button"
              href="index.html#about"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
