import React from "react";
import { Smile } from "lucide-react";
import OutlinedText from "../../assets/Fonts/Outline";

const BottomScroller = () => {
  return (
    <div className="BottomScroller relative bottom-0 left-0 w-full bg-black/90 text-white text-center py-6 z-50 shadow-[0_-2px_10px_rgba(255,255,255,0.1)]">
      <div className="flex flex-row gap-6 animate-marquee">
        <div className="flex items-center gap-4">
          <Smile size={140} strokeWidth={0.5} />
          <OutlinedText>Any Loan</OutlinedText>
        </div>
        <div className="flex items-center gap-4">
          <Smile size={140} strokeWidth={0.5} />
          <OutlinedText> Any Bank</OutlinedText>
        </div>
        <div className="flex items-center gap-4">
          <Smile size={140} strokeWidth={0.5} />
          <OutlinedText> Tailored for You</OutlinedText>
        </div>
      </div>
    </div>
  );
};

export default BottomScroller;
