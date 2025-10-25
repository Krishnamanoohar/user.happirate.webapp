// import React from "react";

// const FaqSection = () => {
//   return (
//     <div>
//       {/* <!-- Faq Section --> */}
//       <section className="faq-9 faq section light-background" id="faq">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-5" data-aos="fade-up">
//               <h2 className="faq-title">Frequently Asked Questions</h2>
//               <p className="faq-description">
//                 We’ve answered some of the most common questions to help you get
//                 the most out of our platform.
//               </p>
//               <div
//                 className="faq-arrow d-none d-lg-block"
//                 data-aos="fade-up"
//                 data-aos-delay="200"
//               ></div>
//             </div>

//             <div className="col-lg-7" data-aos="fade-up" data-aos-delay="300">
//               <div className="faq-container">
//                 <div className="faq-item faq-active">
//                   <h3>How does this platform help me choose the best loan?</h3>
//                   <div className="faq-content">
//                     <p>
//                       We compare loan offers from multiple banks based on your
//                       profile—like interest rates, tenure, eligibility, and
//                       hidden charges—so you can make an informed decision
//                       quickly and confidently.
//                     </p>
//                   </div>
//                   <i className="faq-toggle bi bi-chevron-right"></i>
//                 </div>

//                 <div className="faq-item">
//                   <h3>Is using this platform free?</h3>
//                   <div className="faq-content">
//                     <p>
//                       Yes! You can compare basic loan details for free. We also
//                       offer premium features like in-depth analysis, real-time
//                       alerts, and personalized recommendations on our paid
//                       plans.
//                     </p>
//                   </div>
//                   <i className="faq-toggle bi bi-chevron-right"></i>
//                 </div>

//                 <div className="faq-item">
//                   <h3>Will checking loan offers affect my credit score?</h3>
//                   <div className="faq-content">
//                     <p>
//                       Not at all. We only perform soft eligibility checks that
//                       do not impact your credit score. You stay in control
//                       throughout the process.
//                     </p>
//                   </div>
//                   <i className="faq-toggle bi bi-chevron-right"></i>
//                 </div>

//                 <div className="faq-item">
//                   <h3>Can I apply for the loan directly through your site?</h3>
//                   <div className="faq-content">
//                     <p>
//                       Yes, once you’ve found a suitable offer, you can proceed
//                       to apply through our secure channel in partnership with
//                       the lender. We guide you every step of the way.
//                     </p>
//                   </div>
//                   <i className="faq-toggle bi bi-chevron-right"></i>
//                 </div>

//                 <div className="faq-item">
//                   <h3>How do you ensure the loan offers are up-to-date?</h3>
//                   <div className="faq-content">
//                     <p>
//                       We maintain direct integrations and partnerships with
//                       banks and NBFCs, allowing us to fetch updated rates and
//                       terms in real-time or with minimal delay.
//                     </p>
//                   </div>
//                   <i className="faq-toggle bi bi-chevron-right"></i>
//                 </div>

//                 <div className="faq-item">
//                   <h3>What types of loans can I compare?</h3>
//                   <div className="faq-content">
//                     <p>
//                       Currently, you can compare personal loans, home loans,
//                       education loans, and car loans. We're constantly expanding
//                       to include more financial products based on user demand.
//                     </p>
//                   </div>
//                   <i className="faq-toggle bi bi-chevron-right"></i>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* <!-- /Faq Section --> */}
//     </div>
//   );
// };

// export default FaqSection;

import React, { useState } from "react";

const faqs = [
  {
    question: "How does this platform help me choose the best loan?",
    answer:
      "We compare loan offers from multiple banks based on your profile—like interest rates, tenure, eligibility, and hidden charges—so you can make an informed decision quickly and confidently.",
  },
  {
    question: "Is using this platform free?",
    answer:
      "Yes! You can compare basic loan details for free. We also offer premium features like in-depth analysis, real-time alerts, and personalized recommendations on our paid plans.",
  },
  {
    question: "Will checking loan offers affect my credit score?",
    answer:
      "Not at all. We only perform soft eligibility checks that do not impact your credit score. You stay in control throughout the process.",
  },
  {
    question: "Can I apply for the loan directly through your site?",
    answer:
      "Yes, once you’ve found a suitable offer, you can proceed to apply through our secure channel in partnership with the lender. We guide you every step of the way.",
  },
  {
    question: "How do you ensure the loan offers are up-to-date?",
    answer:
      "We maintain direct integrations and partnerships with banks and NBFCs, allowing us to fetch updated rates and terms in real-time or with minimal delay.",
  },
  {
    question: "What types of loans can I compare?",
    answer:
      "Currently, you can compare personal loans, home loans, education loans, and car loans. We're constantly expanding to include more financial products based on user demand.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq-9 faq section dark-background" id="faq">
      <div className="container">
        <div className="row">
          <div className="col-lg-5" data-aos="fade-up">
            <h2 className="faq-title text-[50px]">Frequently Asked Questions</h2>
            <p className="faq-description">
              We’ve answered some of the most common questions to help <br /> you get
              the most out of our platform.
            </p>
            <div
              className="faq-arrow d-none d-lg-block"
              data-aos="fade-up"
              data-aos-delay="200"
            ></div>
          </div>

          <div className="col-lg-7" data-aos="fade-up" data-aos-delay="300">
            <div className="faq-container">
              {faqs.map((item, index) => (
                <div
                  key={index}
                  className={`faq-item ${
                    activeIndex === index ? "faq-active" : ""
                  }`}
                  onClick={() => toggleFaq(index)}
                  style={{ cursor: "pointer", background:"#454a4c" }}
                >
                  <h3>{item.question}</h3>
                  <div
                    className={`faq-content ${
                      activeIndex === index ? ".faq-toggle" : ""
                    }`}
                  >
                    <p>{item.answer}</p>
                  </div>
                  <i
                    className={`faq-toggle bi ${
                      activeIndex === index
                        ? "bi-chevron-down"
                        : "bi-chevron-right"
                    }`}
                  ></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
