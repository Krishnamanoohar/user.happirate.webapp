import React from "react";
import { Smile } from "lucide-react";
import OutlinedText from "../../assets/Fonts/Outline";

const BottomScroller = () => {
  return (
    <div>
      <div className="BottomScroller w-ful text-white text-center py-6 z-50 shadow-[0_-2px_10px_rgba(255,255,255,0.1)] border-y border-md">
        <div className="flex flex-row gap-6 animate-marquee">
          <div className="flex items-center gap-4">
            <Smile size={70} strokeWidth={0.8} />
            <OutlinedText>Any Loan</OutlinedText>
          </div>
          <div className="flex items-center gap-4">
            <Smile size={70} strokeWidth={0.8} />
            <OutlinedText> Any Bank</OutlinedText>
          </div>
          <div className="flex items-center gap-4">
            <Smile size={70} strokeWidth={0.8} />
            <OutlinedText> Tailored for You</OutlinedText>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomScroller;
