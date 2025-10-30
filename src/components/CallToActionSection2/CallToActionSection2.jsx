// import React from "react";

// const CallToActionSection2 = () => {
//   return (
//     <div>
//       {/* <!-- Call To Action 2 Section --> */}
//       <section
//         id="call-to-action-2"
//         class="call-to-action-2 section dark-background"
//       >
//         <div class="container">
//           <div
//             class="row justify-content-center"
//             data-aos="zoom-in"
//             data-aos-delay="100"
//           >
//             <div class="col-xl-10">
//               <div class="text-center">
//                 <h3>Call To Action</h3>
//                 <p>
//                   Duis aute irure dolor in reprehenderit in voluptate velit esse
//                   cillum dolore eu fugiat nulla pariatur. Excepteur sint
//                   occaecat cupidatat non proident, sunt in culpa qui officia
//                   deserunt mollit anim id est laborum.
//                 </p>
//                 <a class="cta-btn" href="#">
//                   Call To Action
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* <!-- /Call To Action 2 Section --> */}
//     </div>
//   );
// };

// export default CallToActionSection2;

import React from "react";

const CallToActionSection2 = () => {
  return (
    <div>
      {/* <!-- Call To Action 2 Section --> */}
      <section
        id="call-to-action-2"
        className="call-to-action-2 section dark-background"
      >
        <div
          className="container bg-[#4c45a5] p-8 py-24 rounded-4"
          style={{ boxShadow: "rgb(76, 69, 165) -2px 0px 16px 0px" }}
        >
          <div
            className="row justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="col-xl-10">
              <div className="text-center">
                <h2 className="text-6xl" style={{ fontSize: "48px" }}>
                  Find the Right Loan, the Smarter Way
                </h2>
                <p className="pt-4">
                  Stop wasting time visiting multiple bank websites. Our
                  platform compares the best loan offers side by side—tailored
                  to your profile. Get clarity, save money, and make smarter
                  financial decisions today.
                </p>
                <a className="btn-cta rounded-1" href="/compare-loans">
                  Compare Loan Offers Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Call To Action 2 Section --> */}
    </div>
  );
};

export default CallToActionSection2;
