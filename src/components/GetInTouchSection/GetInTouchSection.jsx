import React from "react";

const GetInTouchSection = () => {
  return (
    <div className="" id="get-in-touch">
      {/* <!-- Contact Section --> */}
      <section id="contact" className="contact section">
        {/* <!-- Section Title --> */}
        {/* <div className="container section-title" data-aos="fade-up"> */}
        {/* <h2>Contact</h2> */}
        {/* <p>
            Got questions about loan options, bank partners, or how we work?
            We’re here to help you make smarter borrowing decisions.
          </p> */}
        {/* </div> */}
        {/* <!-- End Section Title --> */}

        <div
          className="container text-white"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="row g-4 g-lg-5">
            <div className="col-lg-6">
              <div
                className="flex flex-col info-bo"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="mt-[3rem]">
                  {/* #1D3FB6 */}
                  <h3 className="custom-heading color-[#fff]">
                    Get in Touch
                  </h3>
                  <p>
                    Reach out to us for personalized loan comparisons,
                    partnership inquiries, <br /> or support. Your financial
                    clarity starts here.
                  </p>
                </div>

                <div
                  className="info-item"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  style={{ marginTop: "3rem" }}
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

            <div className="col-lg-6">
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
                    <div className="col-md-12">
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

                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        name="email"
                        placeholder="Your Mobile Number"
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
                      {/* 
                      <button
                        type="submit"
                        className=" btn w-full flex content-center text-center bg-[#1D3FB6"
                        style={{
                          background: "#1D3FB6",
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                      >
                        Send Message
                      </button> */}

                      <button
                        href="compare-loans"
                        className="w-full vibrant-shadow-btn px-4 btn"
                        onClick={() =>
                          (window.location.href = "/compare-loans")
                        }
                        style={{
                          background: "#000",
                          display: "flex",
                          textAlign: "center",
                          justifyContent: "center",
                          borderRadius: "8px",
                        }}
                      >
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

export default GetInTouchSection;
