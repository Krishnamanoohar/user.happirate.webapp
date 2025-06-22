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
        <div className="container">
          <div
            className="row justify-content-center"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="col-xl-10">
              <div className="text-center">
                <h3>Find the Right Loan, the Smarter Way</h3>
                <p>
                  Stop wasting time visiting multiple bank websites. Our
                  platform compares the best loan offers side by side—tailored
                  to your profile. Get clarity, save money, and make smarter
                  financial decisions today.
                </p>
                <a className="cta-btn" href="/compare-loans">
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
