import React, { useEffect, useRef } from "react";
import styles from "./FuseBorder.module.css"; // custom animation CSS

const FuseBorder = ({ children }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const path = svgRef.current.querySelector("path");
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Animate the dash offset to simulate fuse burn
    path.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], {
      duration: 4000,
      iterations: 1,
      fill: "forwards",
    });
  }, []);

  return (
    <div className="relative w-fit mx-auto">
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        ref={svgRef}
      >
        <path
          d="M5 5 H95 V95 H5 Z"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          className={styles.fusePath}
        />
      </svg>

      <div
        className={`relative z-20 rounded-xl p-6 bg-black text-white ${styles.fuseSparkContainer}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FuseBorder;
