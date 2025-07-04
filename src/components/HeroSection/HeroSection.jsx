import Squares from "../../ReactBitsComps/Squares Grid/Squares";
import Noise from "../../ReactBitsComps/Noise/Noise";
import Silk from "../../ReactBitsComps/SilkBaground/Silk";
import Beams from "../../ReactBitsComps/BeamsBackground/Beams";
import GlareHover from "../../ReactBitsComps/GlareHover/GlareHover";
import DotGrid from "../../ReactBitsComps/DotGrid/DotGrid";
import Particles from "../../ReactBitsComps/Particles/Particles";
import Waves from "../../ReactBitsComps/Waves/Waves";
import AnimatedTable from "./AnimatedTableComp/AnimatedTable";
// import MetallicPaintOverlay from "../../ReactBitsComps/MetallicPaint/MetallicPaint";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* <!-- Hero Section --> */}
      <div className="absolute inset-0 z-0">
        {/* <Squares
          direction="diagonal" // options: right, left, up, down, diagonal
          speed={0.000001}
          // borderColor="#000"
          borderColor="#4959B4"
          hoverFillColor="#222"
          squareSize={75}
        /> */}
        {/* <div
          style={{
            width: "600px",
            height: "400px",
            position: "relative",
            overflow: "hidden",
          }} */}
        {/* > */}
        {/* <Noise
          patternSize={440}
          patternScaleX={3}
          patternScaleY={2.2}
          patternRefreshInterval={2}
          patternAlpha={15}
        /> */}
        {/* <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        /> */}
        {/* <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={120}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={90}
        /> */}
        {/* <DotGrid
          dotSize={6}
          gap={15}
          baseColor="#001"
          activeColor="#000"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        /> */}
        {/* <Particles
          particleColors={["#ffffff", "#ffffff", "#ffffff"]}
          particleCount={300}
          particleSpread={20}
          speed={0.1}
          particleBaseSize={200}
          moveParticlesOnHover={false}
          alphaParticles={false}
          // disableRotation={false}
        /> */}
        <Waves
          lineColor="#fff"
          backgroundColor="rgba(255, 255, 255, 0.2)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
        {/* </div> */}
      </div>

      <section id="hero" className="hero section">
        <div
          className="container hero-gradient"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="flex flex-row justify-left items-center py-3 text-white relative">
            <div className="col-lg-6">
              <div
                className="hero-content"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="company-badge mb-4">
                  <i className="bi bi-bank me-2"></i>
                  Empowering Smart Borrowers
                </div>

                <h1
                  className="mb-4 text-[#180147] text-white"
                  style={{
                    color: "#180147",
                    fontFamily: "var(--manrope-font)",
                  }}
                >
                  Compare Loans <br />
                  From Top Banks <br />
                  <span className="accent-text">
                    Find Your Best Deal Instantly
                  </span>
                </h1>

                <p className="mb-4 mb-md-5" style={{ color: "white" }}>
                  Discover the lowest interest rates, minimal fees, and flexible
                  repayment options all in one place. Save time, save money, and
                  make informed decisions with our transparent loan comparison
                  platform.
                </p>

                <div className="hero-buttons flex">
                  <a
                    href="compare-loans"
                    className="btn metallic-button-container"
                  >
                    <span className="metallic-text">Start Comparing</span>
                    {/* <MetallicPaintOverlay /> */}
                  </a>

                  <a
                    href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                    className="btn btn-link mt-2 mt-sm-0 glightbox"
                  >
                    <i className="bi bi-play-circle me-1"></i>
                    How It Works
                  </a>
                </div>
              </div>
            </div>

            {/* <div className="col-lg-7"> */}
            {/* <div
                className="hero-image"
                data-aos="zoom-out"
                data-aos-delay="300"
              >
                <img
                  src="assets/img/illustration-1.webp"
                  alt="Loan comparison illustration"
                  className="img-fluid"
                />

                <div className="customers-badge">
                  <div className="customer-avatars">
                    <img
                      src="assets/img/avatar-1.webp"
                      alt="Customer 1"
                      className="avatar"
                    />
                    <img
                      src="assets/img/avatar-2.webp"
                      alt="Customer 2"
                      className="avatar"
                    />
                    <img
                      src="assets/img/avatar-3.webp"
                      alt="Customer 3"
                      className="avatar"
                    />
                    <img
                      src="assets/img/avatar-4.webp"
                      alt="Customer 4"
                      className="avatar"
                    />
                    <img
                      src="assets/img/avatar-5.webp"
                      alt="Customer 5"
                      className="avatar"
                    />
                    <span className="avatar more">10k+</span>
                  </div>
                  <p className="mb-0 mt-2">
                    Trusted by over 10,000 borrowers to find the best loans
                  </p>
                </div>
              </div> */}
            <AnimatedTable />
            {/* </div> */}
          </div>

          <div
            className="row stats-row gy-4 mt-5"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-currency-dollar"></i>
                </div>
                <div className="stat-content">
                  <h4>100+ Loan Options</h4>
                  <p className="mb-0">Compare from leading banks & NBFCs</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-clock-history"></i>
                </div>
                <div className="stat-content">
                  <h4>Instant Quotes</h4>
                  <p className="mb-0">Get tailored loan offers in seconds</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div className="stat-content">
                  <h4>Secure & Confidential</h4>
                  <p className="mb-0">Your data privacy is our priority</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="bi bi-people"></i>
                </div>
                <div className="stat-content">
                  <h4>10,000+ Happy Users</h4>
                  <p className="mb-0">
                    Join a growing community of smart borrowers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Hero Section --> */}
    </div>
  );
};

export default HeroSection;
