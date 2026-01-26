// import React from "react";
// import ProfileCard from "../../ReactBitsComps/ProfileCard/ProfileCard";
// import { useNavigate } from "react-router-dom";
// const FeaturesSection2 = () => {
//   const loanCards = [
//     {
//       title: "Personal Loan",
//       description:
//         "Get instant access to funds for your goals — from travel to home upgrades — with simple steps, transparent rates, and zero hidden charges.",
//       // imgSrc: "PersonalLoanOrg.jpg",
//       // imgSrc: "businessLoan.jpg",
//       iconSrc: "Personal loan.png",
//     },
//     {
//       title: "Business Loan",
//       description:
//         "Fuel your business growth with quick, collateral-free funding and flexible repayment options — designed for entrepreneurs who dream big.",
//       // imgSrc: "businessLoan.jpg",
//       iconSrc: "Buisness loan.png",
//     },
//     {
//       title: "Home Loan",
//       description:
//         "Drive home your dream car or bike with fast approvals, low EMIs, and complete transparency from start to finish.",
//       // imgSrc: "autoLoan.jpeg",
//       iconSrc: "Car loan.png",
//     },
//     {
//       title: "Education Loan",
//       description:
//         "Invest in your future with easy, affordable education loans — covering tuition, living, and travel expenses with flexible repayment terms.",
//       // imgSrc: "educationloan.jpg",
//       iconSrc: "Education loan.png",
//     },
//   ];

//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/sign-in");
//   };

//   return (
//     <div className="dark-background" id="solutions">
//       <div className="container">
//         <div className="section-title">
//           <h2 className="text-2xl font-semibold text-center mb-0">Solutions</h2>
//         </div>
//         <section className=" text-white overflow-hidden">
//           {/* subtle noise overlay */}
//           <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
//           <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-10">
//             {loanCards.map((card, index) => (
//               <div
//                 key={index}
//                 className="group relative min-h-[320px] border border-white/10 bg-black/40 p-10 backdrop-blur-sm
//                transition-all duration-300 ease-out
//                hover:scale-[1.03] hover:border-violet-500"
//               >
//                 <div className="flex h-full flex-col justify-between gap-6">
//                   {/* Top Content */}
//                   <div className="flex flex-col gap-6">
//                     <img
//                       alt={card.title}
//                       className="h-10 w-10 object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
//                     />

//                     <h2 className="text-3xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-violet-400">
//                       {card.title}
//                     </h2>

//                     <p className="max-w-sm text-sm leading-relaxed tracking-wide text-white/60 font-mono transition-colors duration-300 group-hover:text-white/70">
//                       {card.description}
//                     </p>
//                   </div>

//                   {/* Apply Now Button */}
//                   <div className="flex justify-center">
//                     <button
//                       className="vibrant-shadow-btn"
//                       onClick={() => handleClick(card)}
//                     >
//                       Apply Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 py-6 rounded-2xl">
//           {loanCards.map((card, index) => (
//             <div
//               key={index}
//               className="flex flex-col border border-white rounded-2xl hover:scale-105 transition duration-200 cursor-pointer"
//             >
//               <div className="rounded-2xl relative max-h-[200px] h-full">
//                 <img
//                   src={`assets/img/${card.imgSrc}`}
//                   alt=""
//                   className="rounded-t-2xl h-full"
//                 />
//                 <div className=" w-full bg-red-50 absolute top-0 left-0 opacity-50 rounded-t-2xl"></div>
//               </div>
//               <div className="flex flex-col justify-center items-center  p-4 pt-2 text-white h-full rounded-t-2xl">
//                 <div>
//                   {
//                     <div className="h-15 w-15 ml-6 relative top-[-50px] p-1 rounded-2xl bg-white">
//                       <img
//                         src={`assets/img/${card.iconSrc}`}
//                         alt=""
//                         className="rounded-2xl"
//                       />
//                     </div>
//                   }
//                   <h3>{card.title}</h3>
//                   <p>{card.description}</p>
//                 </div>
//                 <button
//                   className="vibrant-shadow-btn"
//                   onClick={() => handleClick()}
//                 >
//                   Apply Now
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div> */}

//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 py-12 bg-gradient-to-br from-[#0d1853] to-[#07217e] rounded-2xl">
//           {loanCards.map((card, index) => (
//             <div key={index} className="flex justify-center items-center">
//               <div className="relative w-[240px] h-[240px] rounded-[28px] bg-[#e8ecff] shadow-[inset_8px_8px_16px_#cfd6ff,inset_-8px_-8px_16px_#ffffff] flex justify-center items-center">
//                 <div className="w-[160px] h-[160px] rounded-[22px] bg-[#f4f6ff] shadow-[6px_6px_14px_#cfd6ff,-6px_-6px_14px_#ffffff] flex flex-col justify-center items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-[#e0e5ff] flex justify-center items-center shadow-md">
//                     <img
//                       src={`assets/img/${card.iconSrc}`}
//                       alt=""
//                       className="w-6 h-6 object-contain"
//                     />
//                   </div>

//                   <h3 className="text-[#4f5bff] text-sm font-medium tracking-wide">
//                     {card.title}
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default FeaturesSection2;
import React from "react";
import { useNavigate } from "react-router-dom";

const ArrowIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const FeaturesSection2 = () => {
  const personalLoan = {
    title: "Personal Loan",
    description:
      "Get instant access to funds for your goals — from travel to home upgrades — with simple steps, transparent rates, and zero hidden charges.",
    iconSrc: "Personal loan.png",
  };

  const businessLoan = {
    title: "Business Loan",
    description:
      "Fuel your business growth with quick, collateral-free funding and flexible repayment options — designed for entrepreneurs who dream big.",
    iconSrc: "Buisness loan.png",
  };

  const homeLoan = {
    title: "Home Loan",
    description:
      "Drive home your dream car or bike with fast approvals, low EMIs, and complete transparency from start to finish.",
    iconSrc: "Car loan.png",
  };

  const educationLoan = {
    title: "Education Loan",
    description:
      "Invest in your future with easy, affordable education loans — covering tuition, living, and travel expenses with flexible repayment terms.",
    iconSrc: "Education loan.png",
  };

  const gridSlots = [
    { type: "card", data: businessLoan, position: "top" },
    { type: "empty" },
    { type: "card", data: homeLoan, position: "top" },
    { type: "empty" },
    { type: "empty" },
    { type: "card", data: personalLoan, position: "bottom" },
    { type: "empty" },
    { type: "card", data: educationLoan, position: "bottom" },
  ];

  const navigate = useNavigate();
  const handleClick = () => navigate("/sign-in");

  return (
    <div
      className="bg-black min-h-screen text-white py-20 px-4 relative overflow-hidden "
      id="solutions"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-12 pl-4 border-l-2 border-violet-500">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
            Financial{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
              Solutions
            </span>
          </h2>
          {/* <p className="text-zinc-400 max-w-xl text-lg font-light leading-relaxed">
            High-performance liquidity tools designed for speed, security, and scalability.
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {gridSlots.map((slot, index) => {
            if (slot.type === "card") {
              const { data } = slot;

              return (
                <div
                  key={index}
                  className="group relative bg-black p-4 h-[320px] flex flex-col justify-between transition-all duration-300 border border-zinc-800 hover:border-violet-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

                  <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-1.5 h-1.5 bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.8)]" />
                    <div className="w-1.5 h-1.5 bg-pink-500 shadow-[0_0_5px_rgba(236,72,153,0.8)]" />
                  </div>

                  <span className="absolute top-6 right-8 font-mono text-[10px] text-zinc-600 group-hover:text-violet-400 transition-colors">
                    0{Math.ceil((index + 1) / 2)}
                  </span>

                  <div>
                    <div className="mb-4">
                      <img
                        src={`/assets/img/${data.iconSrc}`}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                        alt={data.title}
                        className="w-10 h-10 object-contain invert opacity-90 group-hover:opacity-100 transition-all duration-300"
                      />
                    </div>

                    <h3 className="text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-violet-200 transition-colors">
                      {data.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed font-medium group-hover:text-zinc-200 transition-colors line-clamp-3">
                      {data.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-4 border-t border-zinc-900 group-hover:border-zinc-800 transition-colors">
                    <button
                      onClick={handleClick}
                      className="w-full flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-all group-hover:text-white"
                    >
                      Apply Now
                      <span className="bg-zinc-900 p-1.5 rounded-full group-hover:bg-violet-600 transition-colors">
                        <ArrowIcon className="w-3 h-3 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div key={index} className="hidden lg:block relative h-[320px]">
                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                  <div className="w-0.5 h-0.5 bg-zinc-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection2;
