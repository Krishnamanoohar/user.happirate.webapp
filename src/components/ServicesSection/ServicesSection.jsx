import React from "react";

const ProductCard = ({ icon, loan }) => {
  return (
    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
      <div className="service-card w-56 d-flex flex-col justify-center align-items-center gap-3 border rounded shadow-sm bg-white">
        <div className="icon flex-shrink-0">
          <i className={icon}></i>
        </div>
        <h6 className="mb-0 text-dark fw-semibold text-nowrap">{loan}</h6>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const loanServices = [
    { name: "Personal Loan", icon: "bi bi-person-badge" },
    { name: "Home Loan", icon: "bi bi-house-door" },
    { name: "Business Loan", icon: "bi bi-briefcase" },
    { name: "Credit Card", icon: "bi bi-credit-card-2-front" },
    { name: "CIBIL Score", icon: "bi bi-bar-chart-line" },
    { name: "Savings Account", icon: "bi bi-piggy-bank" },
  ];

  return (
    <div>
      {/* <!-- Services Section --> */}
      <section id="services" className="services section light-background">
        {/* <!-- Section Title --> */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Our Services</h2>
          <p>
            Delivering innovative, reliable, and tailored solutions to empower
            your business and drive sustainable growth.
          </p>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container flex justify-center gap-2">
          {loanServices.map((loan, index) => (
            <div
              className="col-lg-1.5 cursor-pointer"
              data-aos="fade-up"
              data-aos-delay={400 + index * 100}
              key={index}
            >
              <ProductCard icon={loan.icon} loan={loan.name} />
            </div>
          ))}
        </div>
      </section>
      {/* <!-- /Services Section --> */}
    </div>
  );
};

export default ServicesSection;
