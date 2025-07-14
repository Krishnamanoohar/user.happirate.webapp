import React from "react";

const FeaturesSection = () => {
  return (
    <div>
      {/* <!-- Features Section --> */}
      <section
        id="features"
        className="features section"
        style={{
          background:
            "linear-gradient(to right,rgb(0, 0, 0, 1),rgb(0, 0, 0, 1),rgb(0, 0, 0, 0.9),rgb(0, 0, 0, 1),rgb(0, 0, 0, 1))",
        }}
      >
        {/* <!-- Section Title --> */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>
            Discover why thousands trust our platform to find the best loan
            deals tailored just for them.
          </p>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container">
          <div className="d-flex justify-content-center">
            <ul
              className="nav nav-tabs"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  data-bs-toggle="tab"
                  data-bs-target="#features-tab-1"
                  href="#features-tab-1"
                >
                  <h4>Compare Rates</h4>
                </a>
              </li>
              {/* <!-- End tab nav item --> */}

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#features-tab-2"
                  href="#features-tab-2"
                >
                  <h4>Personalized Offers</h4>
                </a>
              </li>
              {/* <!-- End tab nav item --> */}

              <li className="nav-item">
                <a
                  className="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#features-tab-3"
                  href="#features-tab-3"
                >
                  <h4>Smart Tools</h4>
                </a>
              </li>
              {/* <!-- End tab nav item --> */}
            </ul>
          </div>

          <div className="tab-content" data-aos="fade-up" data-aos-delay="200">
            <div className="tab-pane fade active show" id="features-tab-1">
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>Real-Time Loan Rate Comparisons</h3>
                  <p className="fst-italic">
                    Instantly compare interest rates, processing fees, and
                    tenure options from multiple trusted banks to find the best
                    deal for your loan requirements.
                  </p>
                  <ul>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>
                        Transparent comparison with no hidden charges.
                      </span>
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>Updated regularly with latest bank offers.</span>
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>
                        Easy-to-understand breakdowns to help you decide.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src="assets/img/features-illustration-1.webp"
                    alt="Loan Rate Comparison"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            {/* <!-- End tab content item --> */}

            <div className="tab-pane fade" id="features-tab-2">
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>Personalized Loan Offers</h3>
                  <p className="fst-italic">
                    Get loan recommendations based on your profile, credit
                    score, and preferences — ensuring you get tailored options
                    that suit your financial goals.
                  </p>
                  <ul>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>Customized offers from top lenders.</span>
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>
                        Filters for loan amount, tenure, and interest types.
                      </span>
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>Easy pre-qualification checks to save time.</span>
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>Compare EMI options side by side.</span>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src="assets/img/features-illustration-2.webp"
                    alt="Personalized Offers"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            {/* <!-- End tab content item --> */}

            <div className="tab-pane fade" id="features-tab-3">
              <div className="row">
                <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                  <h3>Smart Tools & Calculators</h3>
                  <ul>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>
                        Interactive EMI calculators to plan your finances.
                      </span>
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>
                        Loan eligibility checkers based on your income and
                        credit.
                      </span>
                    </li>
                    <li>
                      <i className="bi bi-check2-all"></i>
                      <span>
                        Helpful tips and guides for smarter borrowing decisions.
                      </span>
                    </li>
                  </ul>
                  <p className="fst-italic">
                    Our smart tools make loan comparison simple, accurate, and
                    tailored to you.
                  </p>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 text-center">
                  <img
                    src="assets/img/features-illustration-3.webp"
                    alt="Smart Loan Tools"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            {/* <!-- End tab content item --> */}
          </div>
        </div>
      </section>
      {/* <!-- /Features Section --> */}
    </div>
  );
};

export default FeaturesSection;
