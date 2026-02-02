// export default function ScrollingText() {
//   return (
//     <div className="w-full overflow-hidden bg-gray-100 py-2">
//       <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
//         <TickerText />
//         <TickerText />
//       </div>
//     </div>
//   );
// }

// function TickerText() {
//   return (
//     <span className="inline-block text-xl font-semibold text-black mr-8">
//       ☺ Check • Compare • Apply ☺ Check • Compare • Apply ☺ Check • Compare • Apply ☺
//     </span>
//   );
// }
// export default function ScrollingText() {
//   return (
//     <div className="w-full overflow-hidden gradient-bg from-[#f3e6ff] via-[#f0e9ff] to-[#ecebff] py-4 shadow-inner">

//       <div className="flex whitespace-nowrap animate-[marquee_18s_linear_infinite] items-center">
//         <TickerText />
//         <TickerText />
//       </div>
//     </div>
//   );
// }

// function TickerText() { 
//   return (
//     <span className="inline-block text-3xl md:text-4xl font-medium text-black tracking-wide">
//       ☺ Check • Compare • Apply ☺ Check • Compare • Apply ☺ Check • Compare • Apply 
//     </span>
//   );
// }
export default function ScrollingText() {
  return (
    <div className="w-full overflow-hidden gradient-bg from-[#f3e6ff] via-[#f0e9ff] to-[#ecebff] py-4 -mt-1">
      <div className="flex whitespace-nowrap animate-[marquee_18s_linear_infinite] items-center">
        <TickerText />
        <TickerText />
      </div>
    </div>
  );
}

function TickerText() {
  return (
    <span className="inline-block text-7xl md:text-6xl font-medium text-black mr-12 tracking-wide font-['Denton']">
      <span className="text-7xl mr-2">☺</span>
      Check • Compare • Apply{" "}
      <span className="text-7xl mx-2">☺</span>
      Check • Compare • Apply{" "}
      <span className="text-7xl mx-2">☺</span>
    </span>
  );
}




