import React from "react";

const PricingSection = () => {
  return (
    <div>
      {/* <!-- Pricing Section --> */}
      <section id="pricing" className="pricing section light-background">
        {/* <!-- Section Title --> */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Simple & Transparent Pricing</h2>
          <p>
            Whether you're exploring your first loan or optimizing your
            financial decisions, we’ve got a plan that fits your journey.
          </p>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row g-4 justify-content-center">
            {/* <!-- Basic Plan --> */}
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="pricing-card">
                <h3>Basic Plan</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">9.9</span>
                  <span className="period">/ month</span>
                </div>
                <p className="description">
                  Ideal for individuals who need occasional access to bank loan
                  comparisons and want clear, no-nonsense data.
                </p>

                <h4>Features Included:</h4>
                <ul className="features-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Compare up to 5 loan offers
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Real-time interest rate tracking
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Monthly email insights
                  </li>
                </ul>

                <a href="#" className="btn btn-primary">
                  Get Started
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* <!-- Standard Plan --> */}
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="pricing-card popular">
                <div className="popular-badge">Most Popular</div>
                <h3>Standard Plan</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">19.9</span>
                  <span className="period">/ month</span>
                </div>
                <p className="description">
                  Best for professionals and families looking to make smarter
                  borrowing decisions with more data and guidance.
                </p>

                <h4>Features Included:</h4>
                <ul className="features-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Unlimited loan offer comparisons
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Personalized loan recommendations
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Alerts for rate drops
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Priority support
                  </li>
                </ul>

                <a href="#" className="btn btn-light">
                  Get Started
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* <!-- Premium Plan --> */}
            <div className="col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="pricing-card">
                <h3>Premium Plan</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">39.9</span>
                  <span className="period">/ month</span>
                </div>
                <p className="description">
                  Designed for financial advisors, consultants, or serious
                  borrowers who need deep insights and full flexibility.
                </p>

                <h4>Features Included:</h4>
                <ul className="features-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    All Standard Plan features
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Access to historical loan rate data
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    API access for custom integrations
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    1-on-1 expert consultation
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    Early access to new features
                  </li>
                </ul>

                <a href="#" className="btn btn-primary">
                  Get Started
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Pricing Section --> */}
    </div>
  );
};

export default PricingSection;
