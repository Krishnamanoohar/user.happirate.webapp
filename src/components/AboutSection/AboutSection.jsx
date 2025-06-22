// import React from "react";

// const AboutSection = () => {
//   return (
//     <div>
//       {/* <!-- About Section --> */}
//       <section id="about" class="about section">
//         <div class="container" data-aos="fade-up" data-aos-delay="100">
//           <div class="row gy-4 align-items-center justify-content-between">
//             <div class="col-xl-5" data-aos="fade-up" data-aos-delay="200">
//               <span class="about-meta">MORE ABOUT US</span>
//               <h2 class="about-title">Voluptas enim suscipit temporibus</h2>
//               <p class="about-description">
//                 Sed ut perspiciatis unde omnis iste natus error sit voluptatem
//                 accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
//                 quae ab illo inventore veritatis et quasi architecto beatae
//                 vitae dicta sunt explicabo.
//               </p>

//               <div class="row feature-list-wrapper">
//                 <div class="col-md-6">
//                   <ul class="feature-list">
//                     <li>
//                       <i class="bi bi-check-circle-fill"></i> Lorem ipsum dolor
//                       sit amet
//                     </li>
//                     <li>
//                       <i class="bi bi-check-circle-fill"></i> Consectetur
//                       adipiscing elit
//                     </li>
//                     <li>
//                       <i class="bi bi-check-circle-fill"></i> Sed do eiusmod
//                       tempor
//                     </li>
//                   </ul>
//                 </div>
//                 <div class="col-md-6">
//                   <ul class="feature-list">
//                     <li>
//                       <i class="bi bi-check-circle-fill"></i> Incididunt ut
//                       labore et
//                     </li>
//                     <li>
//                       <i class="bi bi-check-circle-fill"></i> Dolore magna
//                       aliqua
//                     </li>
//                     <li>
//                       <i class="bi bi-check-circle-fill"></i> Ut enim ad minim
//                       veniam
//                     </li>
//                   </ul>
//                 </div>
//               </div>

//               <div class="info-wrapper">
//                 <div class="row gy-4">
//                   <div class="col-lg-5">
//                     <div class="profile d-flex align-items-center gap-3">
//                       <img
//                         src="assets/img/avatar-1.webp"
//                         alt="CEO Profile"
//                         class="profile-image"
//                       />
//                       <div>
//                         <h4 class="profile-name">Mario Smith</h4>
//                         <p class="profile-position">CEO &amp; Founder</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div class="col-lg-7">
//                     <div class="contact-info d-flex align-items-center gap-2">
//                       <i class="bi bi-telephone-fill"></i>
//                       <div>
//                         <p class="contact-label">Call us anytime</p>
//                         <p class="contact-number">+123 456-789</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div class="col-xl-6" data-aos="fade-up" data-aos-delay="300">
//               <div class="image-wrapper">
//                 <div
//                   class="images position-relative"
//                   data-aos="zoom-out"
//                   data-aos-delay="400"
//                 >
//                   <img
//                     src="assets/img/about-5.webp"
//                     alt="Business Meeting"
//                     class="img-fluid main-image rounded-4"
//                   />
//                   <img
//                     src="assets/img/about-2.webp"
//                     alt="Team Discussion"
//                     class="img-fluid small-image rounded-4"
//                   />
//                 </div>
//                 <div class="experience-badge floating">
//                   <h3>
//                     15+ <span>Years</span>
//                   </h3>
//                   <p>Of experience in business service</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* <!-- /About Section --> */}
//     </div>
//   );
// };

// export default AboutSection;

import React, { useEffect } from "react";

const AboutSection = () => {
  return (
    <div>
      {/* <!-- About Section --> */}
      <section id="about" className="about section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4 align-items-center justify-content-between">
            <div className="col-xl-5" data-aos="fade-up" data-aos-delay="200">
              <span className="about-meta">ABOUT US</span>
              <h2 className="about-title">
                Simplifying Loan Decisions for Everyone
              </h2>
              <p className="about-description">
                We help you navigate the complex world of loans by providing a
                transparent, easy-to-use platform that compares loan offers from
                multiple banks and lenders — all in one place. Our mission is to
                empower borrowers with clear information so you can choose the
                best loan suited to your needs, without hidden fees or hassle.
              </p>

              <div className="row feature-list-wrapper">
                <div className="col-md-6">
                  <ul className="feature-list">
                    <li>
                      <i className="bi bi-check-circle-fill"></i> Real-time loan
                      rate comparisons
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i> Transparent
                      fees & charges
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i> Easy EMI
                      calculators & eligibility checks
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <ul className="feature-list">
                    <li>
                      <i className="bi bi-check-circle-fill"></i> Trusted by
                      thousands of borrowers
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i> Secure data
                      privacy & encryption
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill"></i> Dedicated
                      customer support
                    </li>
                  </ul>
                </div>
              </div>

              <div className="info-wrapper">
                <div className="row gy-4">
                  <div className="col-lg-5">
                    <div className="profile d-flex align-items-center gap-3">
                      <img
                        src="assets/img/avatar-1.webp"
                        alt="CEO Profile"
                        className="profile-image"
                      />
                      <div>
                        <h4 className="profile-name">Mario Smith</h4>
                        <p className="profile-position">CEO &amp; Founder</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="contact-info d-flex align-items-center gap-2">
                      <i className="bi bi-telephone-fill"></i>
                      <div>
                        <p className="contact-label">Call us anytime</p>
                        <p className="contact-number">+123 456-789</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-6" data-aos="fade-up" data-aos-delay="300">
              <div className="image-wrapper">
                <div
                  className="images position-relative"
                  data-aos="zoom-out"
                  data-aos-delay="400"
                >
                  <img
                    src="assets/img/about-5.webp"
                    alt="Team Collaborating"
                    className="img-fluid main-image rounded-4"
                  />
                  <img
                    src="assets/img/about-2.webp"
                    alt="Customer Support"
                    className="img-fluid small-image rounded-4"
                  />
                </div>
                <div className="experience-badge floating">
                  <h3>
                    10+ <span>Years</span>
                  </h3>
                  <p>Helping borrowers make smarter loan choices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /About Section --> */}
    </div>
  );
};

export default AboutSection;
