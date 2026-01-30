import { useState } from "react";
import AnimatedTable from "./AnimatedTableComp/AnimatedTable";
import ShinyText from "../../ReactBitsComps/ShinyText/ShinyText";

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="relative w-full overflow-hidden pt-32 pb-24 pl-2 app-background min-h-screen">

      <section className="min-h-screen hero w-full">

        <div
          className="container mx-auto max-w-7xl px-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-white relative">

            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-center max-w-xl">

              <div
                className="hero-content"
                data-aos="fade-up"
                data-aos-delay="200"
              >

                {/* Badge */}
                <div className="shiny-text shiny-white company-badge mb-4 w-min text-nowrap shadow-[0_0_20px_5px_rgba(255,255,255,0.6)]">
                  <i className="bi bi-bank me-2"></i>
                  <ShinyText text="Empowering Smart Borrowers" />
                </div>

                {/* Heading */}
                <h1
                  className="mb-4 text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  style={{ fontFamily: "var(--manrope-font)" }}
                >
                  Why Run Around? <br />
                  Compare in One Click
                </h1>

                {/* Description */}
                <p className="mb-4 text-slate-200 max-w-xl">
                  Check rates, fees & tenures across banks and choose
                  what works best for you.
                  <br />
                  <span className="font-semibold">
                    Borrow Smart. Borrow Transparent.
                  </span>
                </p>

                {/* Buttons */}
                <div className="hero-buttons flex gap-4 mt-6">

                  <button
                    className="vibrant-shadow-btn px-4 btn"
                    onClick={() => (window.location.href = "/sign-in")}
                  >
                    Smart Compare
                  </button>

                  <div
                    className="vibrant-shadow-btn cursor-pointer"
                    style={{ animationDuration: "2s" }}
                    onClick={() => setShowVideo(true)}
                  >
                    <i className="bi bi-play-circle"></i>
                    <p className="mb-0">Apply Now</p>
                  </div>

                </div>

              </div>
            </div>


            {/* RIGHT SIDE (GRADIENT TABLE) */}
            <div className="w-full max-w-xl ml-auto body table-wrapper">
  <AnimatedTable />
</div>


          </div>
        </div>


        {/* VIDEO MODAL */}
        {showVideo && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">

            <div className="relative w-full max-w-2xl">

              <iframe
                className="w-full h-64 md:h-96 rounded-lg"
                src="https://www.youtube.com/embed/n93NmihKlVY"
                title="How it works"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>

              <button
                className="absolute top-2 right-2 text-white text-2xl"
                onClick={() => setShowVideo(false)}
              >
                ✖
              </button>

            </div>
          </div>
        )}

      </section>
    </div>
  );
};

export default HeroSection;
