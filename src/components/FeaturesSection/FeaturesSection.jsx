import React from "react";
import ScrollStack, {
  ScrollStackItem,
} from "../../ReactBitsComps/ScrollStack/ScrollStack";

const FeaturesSection = () => {
  return (
    <div>
      {/* <!-- Features Section --> */}
      <section
        // id="features"
        id="solutions"
        className="features section pt-0"
        style={{
          background:
            "linear-gradient(to right,rgb(0, 0, 0, 1),rgb(0, 0, 0, 1),rgb(0, 0, 0, 0.9),rgb(0, 0, 0, 1),rgb(0, 0, 0, 1))",
        }}
      >
        {/* <!-- Section Title --> */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Solutions</h2>
          <p>
            Discover why thousands trust our platform to find the best loan
            deals tailored just for them.
          </p>
        </div>
        {/* <!-- End Section Title --> */}
        <div className="container h-[80vh]">
          <ScrollStack>
            <ScrollStackItem itemClassName="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6 h-[80vh] flex flex-col justify-center bg-[linear-gradient(114deg,#585858,#8692df)]">
              <h2>Compare Rates</h2>
              <p>
                Instantly compare interest rates, processing fees, and tenure
                options from multiple trusted banks to find the best deal for
                your loan requirements.
              </p>
              <ul className="list-disc ml-6">
                <li>Transparent comparison with no hidden charges.</li>
                <li>Updated regularly with latest bank offers.</li>
                <li>Easy-to-understand breakdowns to help you decide.</li>
              </ul>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6 h-[80vh] flex flex-col justify-center bg-[linear-gradient(114deg,#585858,#8692df)]">
              <h2>Personalized Offers</h2>
              <p>
                Get loan recommendations based on your profile, credit score,
                and preferences — ensuring you get tailored options that suit
                your financial goals.
              </p>
              <ul className="list-disc ml-6">
                <li>Customized offers from top lenders.</li>
                <li>Filters for loan amount, tenure, and interest types.</li>
                <li>Easy pre-qualification checks to save time.</li>
                <li>Compare EMI options side by side.</li>
              </ul>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6 h-[80vh] flex flex-col justify-center bg-[linear-gradient(114deg,#585858,#8692df)]">
              <h2>Smart Tools</h2>
              <p>
                Our smart tools make loan comparison simple, accurate, and
                tailored to you.
              </p>
              <ul className="list-disc ml-6">
                <li>Interactive EMI calculators to plan your finances.</li>
                <li>
                  Loan eligibility checkers based on your income and credit.
                </li>
                <li>
                  Helpful tips and guides for smarter borrowing decisions.
                </li>
              </ul>
            </ScrollStackItem>
          </ScrollStack>
        </div>

        {/* <div className="container">
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
          </div>
        </div> */}
      </section>
      {/* <!-- /Features Section --> */}
    </div>
  );
};

export default FeaturesSection;
