// import React from "react";

// const ContactSection = () => {
//   return (
//     <div>
//       {/* <!-- Contact Section --> */}
//       <section id="contact" class="contact section light-background">
//         {/* <!-- Section Title --> */}
//         <div class="container section-title" data-aos="fade-up">
//           <h2>Contact</h2>
//           <p>
//             Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
//             consectetur velit
//           </p>
//         </div>
//         {/* <!-- End Section Title --> */}

//         <div class="container" data-aos="fade-up" data-aos-delay="100">
//           <div class="row g-4 g-lg-5">
//             <div class="col-lg-5">
//               <div class="info-box" data-aos="fade-up" data-aos-delay="200">
//                 <h3>Contact Info</h3>
//                 <p>
//                   Praesent sapien massa, convallis a pellentesque nec, egestas
//                   non nisi. Vestibulum ante ipsum primis.
//                 </p>

//                 <div class="info-item" data-aos="fade-up" data-aos-delay="300">
//                   <div class="icon-box">
//                     <i class="bi bi-geo-alt"></i>
//                   </div>
//                   <div class="content">
//                     <h4>Our Location</h4>
//                     <p>A108 Adam Street</p>
//                     <p>New York, NY 535022</p>
//                   </div>
//                 </div>

//                 <div class="info-item" data-aos="fade-up" data-aos-delay="400">
//                   <div class="icon-box">
//                     <i class="bi bi-telephone"></i>
//                   </div>
//                   <div class="content">
//                     <h4>Phone Number</h4>
//                     <p>+1 5589 55488 55</p>
//                     <p>+1 6678 254445 41</p>
//                   </div>
//                 </div>

//                 <div class="info-item" data-aos="fade-up" data-aos-delay="500">
//                   <div class="icon-box">
//                     <i class="bi bi-envelope"></i>
//                   </div>
//                   <div class="content">
//                     <h4>Email Address</h4>
//                     <p>info@example.com</p>
//                     <p>contact@example.com</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div class="col-lg-7">
//               <div class="contact-form" data-aos="fade-up" data-aos-delay="300">
//                 <h3>Get In Touch</h3>
//                 <p>
//                   Praesent sapien massa, convallis a pellentesque nec, egestas
//                   non nisi. Vestibulum ante ipsum primis.
//                 </p>

//                 <form
//                   action="forms/contact.php"
//                   method="post"
//                   class="php-email-form"
//                   data-aos="fade-up"
//                   data-aos-delay="200"
//                 >
//                   <div class="row gy-4">
//                     <div class="col-md-6">
//                       <input
//                         type="text"
//                         name="name"
//                         class="form-control"
//                         placeholder="Your Name"
//                         required=""
//                       />
//                     </div>

//                     <div class="col-md-6">
//                       <input
//                         type="email"
//                         class="form-control"
//                         name="email"
//                         placeholder="Your Email"
//                         required=""
//                       />
//                     </div>

//                     <div class="col-12">
//                       <input
//                         type="text"
//                         class="form-control"
//                         name="subject"
//                         placeholder="Subject"
//                         required=""
//                       />
//                     </div>

//                     <div class="col-12">
//                       <textarea
//                         class="form-control"
//                         name="message"
//                         rows="6"
//                         placeholder="Message"
//                         required=""
//                       ></textarea>
//                     </div>

//                     <div class="col-12 text-center">
//                       <div class="loading">Loading</div>
//                       <div class="error-message"></div>
//                       <div class="sent-message">
//                         Your message has been sent. Thank you!
//                       </div>

//                       <button type="submit" class="btn">
//                         Send Message
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* <!-- /Contact Section --> */}
//     </div>
//   );
// };

// export default ContactSection;

import React from "react";

const ContactSection = () => {
  return (
    <div>
      {/* <!-- Contact Section --> */}
      <section id="contact" className="contact section light-background">
        {/* <!-- Section Title --> */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>
            Got questions about loan options, bank partners, or how we work?
            We’re here to help you make smarter borrowing decisions.
          </p>
        </div>
        {/* <!-- End Section Title --> */}

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row g-4 g-lg-5">
            <div className="col-lg-5">
              <div className="info-box" data-aos="fade-up" data-aos-delay="200">
                <h3>Get in Touch</h3>
                <p>
                  Reach out to us for personalized loan comparisons, partnership
                  inquiries, or support. Your financial clarity starts here.
                </p>

                <div
                  className="info-item"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <div className="icon-box">
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <div className="content">
                    <h4>Office Address</h4>
                    <p>12 Finance Street</p>
                    <p>San Francisco, CA 94107</p>
                  </div>
                </div>

                <div
                  className="info-item"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <div className="icon-box">
                    <i className="bi bi-telephone"></i>
                  </div>
                  <div className="content">
                    <h4>Call Us</h4>
                    <p>+1 (800) 123-4567</p>
                    <p>+1 (800) 765-4321</p>
                  </div>
                </div>

                <div
                  className="info-item"
                  data-aos="fade-up"
                  data-aos-delay="500"
                >
                  <div className="icon-box">
                    <i className="bi bi-envelope"></i>
                  </div>
                  <div className="content">
                    <h4>Email Us</h4>
                    <p>support@loanwise.com</p>
                    <p>info@loanwise.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div
                className="contact-form"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3>Send Us a Message</h3>
                <p>
                  Want to know which loan suits you best? Send us your query and
                  our team will get back with the right guidance.
                </p>

                <form
                  action="forms/contact.php"
                  method="post"
                  className="php-email-form"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="row gy-4">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Your Name"
                        required=""
                      />
                    </div>

                    <div className="col-md-6">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Your Email"
                        required=""
                      />
                    </div>

                    <div className="col-12">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        placeholder="Subject"
                        required=""
                      />
                    </div>

                    <div className="col-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows="6"
                        placeholder="Message"
                        required=""
                      ></textarea>
                    </div>

                    <div className="col-12 text-center">
                      <div className="loading">Loading</div>
                      <div className="error-message"></div>
                      <div className="sent-message">
                        Your message has been sent. Thank you!
                      </div>

                      <button type="submit" className="btn">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Contact Section --> */}
    </div>
  );
};

export default ContactSection;
