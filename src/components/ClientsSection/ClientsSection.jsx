// import React from "react";

// const ClientsSection = () => {
//   return (
//     <div>
//       {/* <!-- Clients Section --> */}
//       <section id="clients" class="clients section">
//         <div class="container" data-aos="fade-up" data-aos-delay="100">
//           <div class="swiper init-swiper">
//             <div class="swiper-wrapper align-items-center">
//               <div class="swiper-slide">
//                 <img
//                   src="assets/img/clients/client-1.png"
//                   class="img-fluid"
//                   alt=""
//                 />
//               </div>
//               <div class="swiper-slide">
//                 <img
//                   src="assets/img/clients/client-2.png"
//                   class="img-fluid"
//                   alt=""
//                 />
//               </div>
//               <div class="swiper-slide">
//                 <img
//                   src="assets/img/clients/client-3.png"
//                   class="img-fluid"
//                   alt=""
//                 />
//               </div>
//               <div class="swiper-slide">
//                 <img
//                   src="assets/img/clients/client-4.png"
//                   class="img-fluid"
//                   alt=""
//                 />
//               </div>
//               <div class="swiper-slide">
//                 <img
//                   src="assets/img/clients/client-5.png"
//                   class="img-fluid"
//                   alt=""
//                 />
//               </div>
//               <div class="swiper-slide">
//                 <img
//                   src="assets/img/clients/client-6.png"
//                   class="img-fluid"
//                   alt=""
//                 />
//               </div>
//               <div class="swiper-slide">
//                 <img
//                   src="assets/img/clients/client-7.png"
//                   class="img-fluid"
//                   alt=""
//                 />
//               </div>
//               <div class="swiper-slide">
//                 <img
//                   src="assets/img/clients/client-8.png"
//                   class="img-fluid"
//                   alt=""
//                 />
//               </div>
//             </div>
//             <div class="swiper-pagination"></div>
//           </div>
//         </div>
//       </section>
//       {/* <!-- /Clients Section --> */}
//     </div>
//   );
// };

// export default ClientsSection;

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const ClientsSection = () => {
  const banks = [
    {
      id: 1,
      bank: "HDFC Bank",
      interestRate: "10.5%",
      processingFee: "1%",
      tenure: "5 years",
      maxAmount: "₹10,00,000",
      logo: "hdfc-logo.png",
    },
    {
      id: 2,
      bank: "ICICI Bank",
      interestRate: "11.2%",
      processingFee: "0.5%",
      tenure: "4 years",
      maxAmount: "₹8,00,000",
      logo: "icici-logo.png",
    },
    {
      id: 3,
      bank: "State Bank of India",
      interestRate: "9.7%",
      processingFee: "0.35%",
      tenure: "6 years",
      maxAmount: "₹12,00,000",
      logo: "sbi-logo.jpg",
    },
    {
      id: 4,
      bank: "Axis Bank",
      interestRate: "10.25%",
      processingFee: "1.25%",
      tenure: "5 years",
      maxAmount: "₹9,00,000",
      logo: "axis-logo.jpg",
    },
    {
      id: 5,
      bank: "Kotak Mahindra Bank",
      interestRate: "11.0%",
      processingFee: "0.75%",
      tenure: "4 years",
      maxAmount: "₹7,00,000",
      logo: "kotak-logo.png",
    },
    {
      id: 6,
      bank: "Punjab National Bank",
      interestRate: "10.0%",
      processingFee: "0.50%",
      tenure: "6 years",
      maxAmount: "₹10,00,000",
      logo: "pnb-logo.png",
    },
    {
      id: 7,
      bank: "Yes Bank",
      interestRate: "12.5%",
      processingFee: "2%",
      tenure: "3 years",
      maxAmount: "₹6,00,000",
      logo: "yes-logo.png",
    },
    {
      id: 8,
      bank: "IDFC FIRST Bank",
      interestRate: "9.9%",
      processingFee: "1%",
      tenure: "5 years",
      maxAmount: "₹9,50,000",
      logo: "idfc-logo.png",
    },
    {
      id: 9,
      bank: "Bank of Baroda",
      interestRate: "10.1%",
      processingFee: "0.75%",
      tenure: "5 years",
      maxAmount: "₹8,50,000",
      logo: "baroda-logo.png",
    },
    {
      id: 10,
      bank: "IndusInd Bank",
      interestRate: "11.3%",
      processingFee: "1%",
      tenure: "4 years",
      maxAmount: "₹7,50,000",
      logo: "indusind-logo.png",
    },
    {
      id: 11,
      bank: "Bajaj Finserv",
      interestRate: "13.0%",
      processingFee: "1.25%",
      tenure: "3 years",
      maxAmount: "₹5,00,000",
      logo: "bajaj-logo.png",
    },
    {
      id: 12,
      bank: "Tata Capital",
      interestRate: "12.75%",
      processingFee: "1%",
      tenure: "4 years",
      maxAmount: "₹6,00,000",
      logo: "tata-logo.png",
    },
    {
      id: 13,
      bank: "IDBI Bank",
      interestRate: "9.5%",
      processingFee: "0.65%",
      tenure: "6 years",
      maxAmount: "₹10,00,000",
      logo: "idbi-logo.png",
    },
    {
      id: 14,
      bank: "Union Bank of India",
      interestRate: "9.9%",
      processingFee: "0.50%",
      tenure: "5 years",
      maxAmount: "₹9,00,000",
      logo: "union-logo.png",
    },
    {
      id: 15,
      bank: "Canara Bank",
      interestRate: "10.2%",
      processingFee: "0.75%",
      tenure: "6 years",
      maxAmount: "₹11,00,000",
      logo: "canara-logo.jpeg",
    },
    {
      id: 16,
      bank: "Federal Bank",
      interestRate: "10.8%",
      processingFee: "1.5%",
      tenure: "4 years",
      maxAmount: "₹7,50,000",
      logo: "federal-logo.jpeg",
    },
    {
      id: 17,
      bank: "South Indian Bank",
      interestRate: "11.6%",
      processingFee: "1%",
      tenure: "5 years",
      maxAmount: "₹6,50,000",
      logo: "southIndianBank-logo.jpg",
    },
    {
      id: 18,
      bank: "Karur Vysya Bank",
      interestRate: "10.9%",
      processingFee: "1.1%",
      tenure: "4 years",
      maxAmount: "₹8,00,000",
      logo: "kvb-logo.jpeg",
    },
    {
      id: 19,
      bank: "RBL Bank",
      interestRate: "12.0%",
      processingFee: "2%",
      tenure: "3 years",
      maxAmount: "₹5,50,000",
      logo: "rbl-logo.png",
    },
    {
      id: 20,
      bank: "HSBC Bank",
      interestRate: "10.0%",
      processingFee: "0.99%",
      tenure: "5 years",
      maxAmount: "₹10,00,000",
      logo: "hsbc-logo.png",
    },
  ];
  return (
    // <section id="clients" className="clients section">
    //   <div className="container" data-aos="fade-up" data-aos-delay="100">
    //     <Swiper
    //       loop={true}
    //       speed={600}
    //       autoplay={{ delay: 1000 }}
    //       slidesPerView="auto"
    //       pagination={{ clickable: true }}
    //       spaceBetween={40}
    //       modules={[Pagination, Autoplay]}
    //       breakpoints={{
    //         320: { slidesPerView: 2, spaceBetween: 40 },
    //         480: { slidesPerView: 3, spaceBetween: 60 },
    //         640: { slidesPerView: 4, spaceBetween: 80 },
    //         992: { slidesPerView: 6, spaceBetween: 120 },
    //       }}
    //     >
    //       {[...Array(8)].map((_, idx) => (
    //         <SwiperSlide key={idx}>
    //           <img
    //             src={`assets/img/clients/client-${idx + 1}.png`}
    //             className="img-fluid"
    //             alt={`Client ${idx + 1}`}
    //           />
    //         </SwiperSlide>
    //       ))}
    //     </Swiper>
    //   </div>
    // </section>
    <section className="container bg-transparent pt-12 py-6 mx-auto bg-white">
      <div className="section-title">
        <h2 className="text-2xl font-semibold text-center">Partner Banks</h2>
      </div>
      <section className="bg-transparent pt-0">
        <Swiper
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: true,
          }}
          slidesPerView="auto"
          spaceBetween={10}
          allowTouchMove={true}
          grabCursor={false}
          breakpoints={{
            320: { slidesPerView: 4 },
            480: { slidesPerView: 5 },
            768: { slidesPerView: 6 },
            1024: { slidesPerView: 10 },
          }}
          modules={[Autoplay]}
          className="w-full"
        >
          {banks.map((bank) => (
            <SwiperSlide
              key={bank.id}
              className="d-flex flex-column gap-3 justify-center items-center"
            >
              <div className="d-flex align-items-center h-26 p-6  border-secondary rounded">
                <img
                  src={`/assets/img/bank-logos/${bank.logo}`}
                  alt={bank.bank}
                  className="max-h-16 w-16 object-contain hover:grayscale-0 transition duration-300 rounded"
                />
              </div>
              <h6 className="text-center">{bank.bank}</h6>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
};

export default ClientsSection;
