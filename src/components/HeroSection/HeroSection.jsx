import Squares from "../../ReactBitsComps/Squares Grid/Squares";
import Noise from "../../ReactBitsComps/Noise/Noise";
import Silk from "../../ReactBitsComps/SilkBaground/Silk";
import Beams from "../../ReactBitsComps/BeamsBackground/Beams";
import GlareHover from "../../ReactBitsComps/GlareHover/GlareHover";
import DotGrid from "../../ReactBitsComps/DotGrid/DotGrid";
import Particles from "../../ReactBitsComps/Particles/Particles";
import Waves from "../../ReactBitsComps/Waves/Waves";
import AnimatedTable from "./AnimatedTableComp/AnimatedTable";
import Header from "../Header/Header";
import ShinyText from "../../ReactBitsComps/ShinyText/ShinyText";

const HeroSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <section id="hero" className="min-h-screen hero section">
        <div
          className="container hero-gradient"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex flex-row justify-left items-center pt-4 text-white relative">
            <div className="col-lg-6 flex flex-col justify-end">
              <div
                className="hero-content"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="shiny-text shiny-white company-badge mb-4 w-min text-nowrap shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]">
                  <i className="bi bi-bank me-2"></i>
                  <ShinyText text={"Empowering Smart Borrowers"} />
                </div>

                <h1
                  className="mb-4 text-[#180147] text-white"
                  style={{
                    color: "#180147",
                    fontFamily: "var(--manrope-font)",
                  }}
                >
                  Compare Loans <br /> from Top Banks
                  {/* Any Loan. Any Bank. Tailored for You. */}
                  {/*  Compare Loans <br />
                  From Top Banks <br />
                  <span className="accent-text">
                    Find Your Best Deal Instantly
                  </span> */}
                </h1>

                <p className="mb-4 mb-md-5" style={{ color: "white" }}>
                  Compare the lowest rates, minimal fees, and flexible terms—all
                  in one place. Save time, save money, and borrow smarter with
                  complete transparency.
                </p>

                <div className="hero-buttons flex gap-4 mt-6">
                  <button
                    href="compare-loans"
                    className="vibrant-shadow-btn px-4 btn"
                  >
                    Start Comparing
                  </button>
                  {/* 
                  <a
                    href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                    className="shiny-text"
                  >
                    How It Works
                  </a> */}

                  <div
                    className="vibrant-shadow-btn"
                    style={{ animationDuration: "2s" }}
                  >
                    <i className="bi bi-play-circle"></i>
                    <p className="mb-0">How it works</p>
                  </div>
                </div>
              </div>
            </div>

            <AnimatedTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
