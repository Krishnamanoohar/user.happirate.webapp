import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const KimiFeaturesSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  // Add card to ref array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animation
      gsap.to(".section-header", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });

      // 2. Staggered Card Animation
      gsap.to(".feature-card", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.4
      });

      // 3. Floating Icons Animation
      gsap.to(".icon-wrapper", {
        y: -5,
        duration: 2.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "start"
        }
      });

      // 4. Interactive Card Logic (Tilt & Particles)
      cardsRef.current.forEach((card) => {
        // Tilt Effect
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;
          
          gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000
          });
        });

        // Reset Tilt
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        });

        // Particle Burst on Click
        card.addEventListener('click', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            // We append to card to keep it contained, but need to position absolute
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#7c3bed';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            card.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 60 + Math.random() * 40;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity - 60;
            
            gsap.to(particle, {
              x: tx,
              y: ty,
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(particle, {
                  opacity: 0,
                  y: ty - 40,
                  duration: 0.4,
                  ease: "power2.in",
                  onComplete: () => particle.remove()
                });
              }
            });
          }
        });
      });

    }, containerRef); // Scope GSAP to this component

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden font-sans bg-gradient-to-br from-white via-[#f8f7ff] to-white">
      {/* Styles Injected Locally to preserve specific effects */}
      <style>{`
        /* Animated Orbs */
        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          z-index: 0;
          animation: floatOrb 20s ease-in-out infinite;
        }
        
        .orb-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #7c3bed, #a78bfa);
          top: -100px;
          right: -100px;
          animation-delay: 0s;
        }
        
        .orb-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #c4b5fd, #7c3bed);
          bottom: -50px;
          left: -50px;
          animation-delay: -5s;
        }
        
        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        /* Card Effects */
        .feature-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(124, 59, 237, 0.1);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(124, 59, 237, 0.05);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(124, 59, 237, 0.05), rgba(255, 255, 255, 0), rgba(124, 59, 237, 0.03));
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 0;
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        /* Shimmer Effect */
        .feature-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.8) 50%, transparent 60%);
          transform: rotate(45deg) translateY(-100%);
          transition: transform 0.8s;
        }

        .feature-card:hover::after {
          transform: rotate(45deg) translateY(100%);
        }

        .feature-card:hover {
          transform: translateY(-8px);
          border-color: rgba(124, 59, 237, 0.3);
          box-shadow: 0 20px 40px -15px rgba(124, 59, 237, 0.15), 0 0 0 1px rgba(124, 59, 237, 0.1);
        }

        /* Icon Wrapper */
        .icon-wrapper {
          background: linear-gradient(135deg, rgba(124, 59, 237, 0.1), rgba(124, 59, 237, 0.05));
          border: 1px solid rgba(124, 59, 237, 0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .icon-wrapper::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #7c3bed, #ddd6fe, #7c3bed);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .feature-card:hover .icon-wrapper::before {
          opacity: 1;
          animation: rotate 3s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .feature-card:hover .icon-wrapper {
          transform: scale(1.1) rotate(5deg);
          background: linear-gradient(135deg, #7c3bed, #8b5cf6);
          border-color: transparent;
          box-shadow: 0 10px 25px -5px rgba(124, 59, 237, 0.4);
        }

        .feature-card:hover .icon-wrapper svg {
          color: white;
        }

        /* Link Arrow */
        .link-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .feature-card:hover .link-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Title Underline */
        .title-underline {
          position: relative;
          display: inline-block;
        }

        .title-underline::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #7c3bed, transparent);
          transition: width 0.4s ease;
        }

        .feature-card:hover .title-underline::after {
          width: 100%;
        }
      `}</style>

      {/* Background Orbs */}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="section-header text-center mb-16 opacity-0">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#ede9fe]/50 text-[#7c3bed] text-sm font-semibold mb-4 border border-[#7c3bed]/20">
            Our Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
            Why Choose <span className="text-[#7c3bed]">Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#7c3bed] to-transparent mx-auto rounded-full opacity-50"></div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div ref={addToRefs} className="feature-card rounded-2xl p-8 group cursor-pointer opacity-0 translate-y-8">
            <div className="icon-wrapper w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#7c3bed] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <span className="title-underline">Trusted Lender Network</span>
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Access offers from verified banks and financial institutions you can trust, ensuring safe and reliable loan options.
            </p>
            <div className="mt-6 flex items-center text-[#7c3bed] text-sm font-semibold link-arrow">
              <span>Learn more</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>

          {/* Card 2 */}
          <div ref={addToRefs} className="feature-card rounded-2xl p-8 group cursor-pointer opacity-0 translate-y-8">
            <div className="icon-wrapper w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#7c3bed] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <span className="title-underline">Transparent Comparison</span>
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Compare interest rates, fees, and repayment terms side-by-side with no hidden charges or surprises.
            </p>
            <div className="mt-6 flex items-center text-[#7c3bed] text-sm font-semibold link-arrow">
              <span>Compare now</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>

          {/* Card 3 */}
          <div ref={addToRefs} className="feature-card rounded-2xl p-8 group cursor-pointer opacity-0 translate-y-8">
            <div className="icon-wrapper w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#7c3bed] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <span className="title-underline">Easy EMI Calculators</span>
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Use our smart calculators to estimate monthly payments and plan your budget effortlessly.
            </p>
            <div className="mt-6 flex items-center text-[#7c3bed] text-sm font-semibold link-arrow">
              <span>Calculate EMI</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>

          {/* Card 4 */}
          <div ref={addToRefs} className="feature-card rounded-2xl p-8 group cursor-pointer opacity-0 translate-y-8">
            <div className="icon-wrapper w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#7c3bed] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              <span className="title-underline">Data Privacy & Security</span>
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Your personal information is protected with top-level encryption protocols to keep your data safe and confidential.
            </p>
            <div className="mt-6 flex items-center text-[#7c3bed] text-sm font-semibold link-arrow">
              <span>View security</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KimiFeaturesSection;