// import React from "react";

// const FeaturesCardsSection = () => {
//   return (
//     <div>
//       {/* <!-- Features Cards Section --> */}
//       <section id="features-cards" class="features-cards section">
//         <div class="container">
//           <div class="row gy-4">
//             <div
//               class="col-xl-3 col-md-6"
//               data-aos="zoom-in"
//               data-aos-delay="100"
//             >
//               <div class="feature-box orange">
//                 <i class="bi bi-award"></i>
//                 <h4>Corporis voluptates</h4>
//                 <p>
//                   Consequuntur sunt aut quasi enim aliquam quae harum pariatur
//                   laboris nisi ut aliquip
//                 </p>
//               </div>
//             </div>
//             {/* <!-- End Feature Borx--> */}

//             <div
//               class="col-xl-3 col-md-6"
//               data-aos="zoom-in"
//               data-aos-delay="200"
//             >
//               <div class="feature-box blue">
//                 <i class="bi bi-patch-check"></i>
//                 <h4>Explicabo consectetur</h4>
//                 <p>
//                   Est autem dicta beatae suscipit. Sint veritatis et sit quasi
//                   ab aut inventore
//                 </p>
//               </div>
//             </div>
//             {/* <!-- End Feature Borx--> */}

//             <div
//               class="col-xl-3 col-md-6"
//               data-aos="zoom-in"
//               data-aos-delay="300"
//             >
//               <div class="feature-box green">
//                 <i class="bi bi-sunrise"></i>
//                 <h4>Ullamco laboris</h4>
//                 <p>
//                   Excepteur sint occaecat cupidatat non proident, sunt in culpa
//                   qui officia deserunt
//                 </p>
//               </div>
//             </div>
//             {/* <!-- End Feature Borx--> */}

//             <div
//               class="col-xl-3 col-md-6"
//               data-aos="zoom-in"
//               data-aos-delay="400"
//             >
//               <div class="feature-box red">
//                 <i class="bi bi-shield-check"></i>
//                 <h4>Labore consequatur</h4>
//                 <p>
//                   Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut
//                   maiores omnis facere
//                 </p>
//               </div>
//             </div>
//             {/* <!-- End Feature Borx--> */}
//           </div>
//         </div>
//       </section>
//       {/* <!-- /Features Cards Section --> */}
//     </div>
//   );
// };

// export default FeaturesCardsSection;

import React from "react";

const FeaturesCardsSection = () => {
  return (
    <div>
      {/* <!-- Features Cards Section --> */}
      <section id="features-cards" className="features-cards section">
        <div className="container">
          <div className="row gy-4">
            <div
              className="col-xl-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <div className="feature-box orange">
                <i className="bi bi-award"></i>
                <h4>Trusted Lender Network</h4>
                <p>
                  Access offers from verified banks and financial institutions
                  you can trust, ensuring safe and reliable loan options.
                </p>
              </div>
            </div>
            {/* <!-- End Feature Box--> */}

            <div
              className="col-xl-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div className="feature-box blue">
                <i className="bi bi-patch-check"></i>
                <h4>Transparent Comparison</h4>
                <p>
                  Compare interest rates, fees, and repayment terms side-by-side
                  with no hidden charges or surprises.
                </p>
              </div>
            </div>
            {/* <!-- End Feature Box--> */}

            <div
              className="col-xl-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="feature-box green">
                <i className="bi bi-sunrise"></i>
                <h4>Easy EMI Calculators</h4>
                <p>
                  Use our smart calculators to estimate monthly payments and
                  plan your budget effortlessly.
                </p>
              </div>
            </div>
            {/* <!-- End Feature Box--> */}

            <div
              className="col-xl-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <div className="feature-box red">
                <i className="bi bi-shield-check"></i>
                <h4>Data Privacy & Security</h4>
                <p>
                  Your personal information is protected with top-level
                  encryption protocols to keep your data safe and confidential.
                </p>
              </div>
            </div>
            {/* <!-- End Feature Box--> */}
          </div>
        </div>
      </section>
      {/* <!-- /Features Cards Section --> */}
    </div>
  );
};

export default FeaturesCardsSection;
