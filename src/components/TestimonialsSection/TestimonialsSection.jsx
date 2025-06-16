// import React from "react";

// const TestimonialsSection = () => {
//   return (
//     <div>
//       {/* <!-- Testimonials Section --> */}
//       <section id="testimonials" class="testimonials section light-background">
//         {/* <!-- Section Title --> */}
//         <div class="container section-title" data-aos="fade-up">
//           <h2>Testimonials</h2>
//           <p>
//             Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
//             consectetur velit
//           </p>
//         </div>
//         {/* <!-- End Section Title --> */}

//         <div class="container">
//           <div class="row g-5">
//             <div class="col-lg-6" data-aos="fade-up" data-aos-delay="100">
//               <div class="testimonial-item">
//                 <img
//                   src="assets/img/testimonials/testimonials-1.jpg"
//                   class="testimonial-img"
//                   alt=""
//                 />
//                 <h3>Saul Goodman</h3>
//                 <h4>Ceo &amp; Founder</h4>
//                 <div class="stars">
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                 </div>
//                 <p>
//                   <i class="bi bi-quote quote-icon-left"></i>
//                   <span>
//                     Proin iaculis purus consequat sem cure digni ssim donec
//                     porttitora entum suscipit rhoncus. Accusantium quam,
//                     ultricies eget id, aliquam eget nibh et. Maecen aliquam,
//                     risus at semper.
//                   </span>
//                   <i class="bi bi-quote quote-icon-right"></i>
//                 </p>
//               </div>
//             </div>
//             {/* <!-- End testimonial item --> */}

//             <div class="col-lg-6" data-aos="fade-up" data-aos-delay="200">
//               <div class="testimonial-item">
//                 <img
//                   src="assets/img/testimonials/testimonials-2.jpg"
//                   class="testimonial-img"
//                   alt=""
//                 />
//                 <h3>Sara Wilsson</h3>
//                 <h4>Designer</h4>
//                 <div class="stars">
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                 </div>
//                 <p>
//                   <i class="bi bi-quote quote-icon-left"></i>
//                   <span>
//                     Export tempor illum tamen malis malis eram quae irure esse
//                     labore quem cillum quid cillum eram malis quorum velit fore
//                     eram velit sunt aliqua noster fugiat irure amet legam anim
//                     culpa.
//                   </span>
//                   <i class="bi bi-quote quote-icon-right"></i>
//                 </p>
//               </div>
//             </div>
//             {/* <!-- End testimonial item --> */}

//             <div class="col-lg-6" data-aos="fade-up" data-aos-delay="300">
//               <div class="testimonial-item">
//                 <img
//                   src="assets/img/testimonials/testimonials-3.jpg"
//                   class="testimonial-img"
//                   alt=""
//                 />
//                 <h3>Jena Karlis</h3>
//                 <h4>Store Owner</h4>
//                 <div class="stars">
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                 </div>
//                 <p>
//                   <i class="bi bi-quote quote-icon-left"></i>
//                   <span>
//                     Enim nisi quem export duis labore cillum quae magna enim
//                     sint quorum nulla quem veniam duis minim tempor labore quem
//                     eram duis noster aute amet eram fore quis sint minim.
//                   </span>
//                   <i class="bi bi-quote quote-icon-right"></i>
//                 </p>
//               </div>
//             </div>
//             {/* <!-- End testimonial item --> */}

//             <div class="col-lg-6" data-aos="fade-up" data-aos-delay="400">
//               <div class="testimonial-item">
//                 <img
//                   src="assets/img/testimonials/testimonials-4.jpg"
//                   class="testimonial-img"
//                   alt=""
//                 />
//                 <h3>Matt Brandon</h3>
//                 <h4>Freelancer</h4>
//                 <div class="stars">
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                   <i class="bi bi-star-fill"></i>
//                 </div>
//                 <p>
//                   <i class="bi bi-quote quote-icon-left"></i>
//                   <span>
//                     Fugiat enim eram quae cillum dolore dolor amet nulla culpa
//                     multos export minim fugiat minim velit minim dolor enim duis
//                     veniam ipsum anim magna sunt elit fore quem dolore labore
//                     illum veniam.
//                   </span>
//                   <i class="bi bi-quote quote-icon-right"></i>
//                 </p>
//               </div>
//             </div>
//             {/* <!-- End testimonial item --> */}
//           </div>
//         </div>
//       </section>
//       {/* <!-- /Testimonials Section --> */}
//     </div>
//   );
// };

// export default TestimonialsSection;

import React from "react";

const TestimonialsSection = () => {
  return (
    <div>
      {/* <!-- Testimonials Section --> */}
      <section
        id="testimonials"
        className="testimonials section light-background"
      >
        {/* <!-- Section Title --> */}
        <div className="container section-title" data-aos="fade-up">
          <h2>What Our Users Say</h2>
          <p>
            Hear from real people who’ve used our platform to find better,
            faster, and smarter financial solutions.
          </p>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div className="testimonial-item">
                <img
                  src="assets/img/testimonials/testimonials-1.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Saul Goodman</h3>
                <h4>Startup Founder</h4>
                <div className="stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>
                    This platform saved me hours of research. I compared
                    multiple banks and got the best loan deal for my
                    business—all in one place.
                  </span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
              <div className="testimonial-item">
                <img
                  src="assets/img/testimonials/testimonials-2.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Sara Wilsson</h3>
                <h4>UX Designer</h4>
                <div className="stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>
                    The interface is super easy to use and gave me clarity on
                    interest rates, eligibility, and hidden fees I wasn’t even
                    aware of before.
                  </span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
              <div className="testimonial-item">
                <img
                  src="assets/img/testimonials/testimonials-3.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Jena Karlis</h3>
                <h4>Retail Business Owner</h4>
                <div className="stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>
                    I needed a personal loan fast. Within minutes, I knew which
                    bank was offering the best rate. Highly recommended!
                  </span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
              <div className="testimonial-item">
                <img
                  src="assets/img/testimonials/testimonials-4.jpg"
                  className="testimonial-img"
                  alt=""
                />
                <h3>Matt Brandon</h3>
                <h4>Freelancer</h4>
                <div className="stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                </div>
                <p>
                  <i className="bi bi-quote quote-icon-left"></i>
                  <span>
                    It’s like having a financial advisor in your pocket.
                    Transparent comparisons, accurate info, and no spam
                    calls—just results.
                  </span>
                  <i className="bi bi-quote quote-icon-right"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Testimonials Section --> */}
    </div>
  );
};

export default TestimonialsSection;
