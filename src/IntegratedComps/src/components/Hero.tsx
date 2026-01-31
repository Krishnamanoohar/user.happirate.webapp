import { useEffect, useRef, useState } from "react";
import { Landmark, Play, TrendingUp, Wallet, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
}

function StatCard({ icon, label, value, delay }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`glass-card rounded-2xl p-5 hover-lift transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-slate-500 text-sm font-medium">{label}</span>
        <div className="w-8 h-8 rounded-lg gradient-bg-light flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-20 lg:pt-24 overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-violet-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-bg-light border border-indigo-100">
              <Landmark className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                Empowering Smart Borrowers
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-slate-900">Compare Loans from</span>&nbsp;
              <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent">
                Top Banks
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Compare the lowest rates, minimal fees, and flexible terms—all in
              one place. Save time, save money, and borrow smarter with complete
              transparency.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gradient-bg text-white font-semibold px-8 py-6 rounded-full hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 group"
                onClick={() => (window.location.pathname = "/sign-in")}
              >
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                size="lg"
                className="border-2 font-semibold px-8 py-6 rounded-full hover:border-[#7c3bed] transition-all duration-300 group"
              >
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center mr-2 group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 text-white fill-[#7c3bed] ml-0.5" />
                </div>
                How its works
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full gradient-bg border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              {/* <div>
                <div className="font-semibold text-slate-900">50,000+</div>
                <div className="text-sm text-slate-500">Happy Customers</div>
              </div> */}
            </div>
          </div>

          {/* Right Content - Stats & Preview */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200  ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 ">
              <div className=" rounded-2xl">
                <StatCard
                  icon={<Wallet className="w-4 h-4 text-indigo-600" />}
                  label="Total Disbursed"
                  value="₹6,320 Lakh"
                  delay={0}
                />
              </div>
              <div className=" rounded-2xl">
                <StatCard
                  icon={<TrendingUp className="w-4 h-4 text-violet-600" />}
                  label="Avg. Interest Rate"
                  value="7.34%"
                  delay={100}
                />
              </div>
            </div>

            {/* Featured Banks Preview */}
            <div className="glass-card rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Featured Banks</h3>
                <span className="text-sm text-indigo-600 font-medium cursor-pointer hover:underline">
                  View All
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Bank of Baroda",
                    rate: "10.1%",
                    amount: "₹850000",
                    color: "from-orange-400 to-red-500",
                  },
                  {
                    name: "IndusInd Bank",
                    rate: "11.3%",
                    amount: "₹750000",
                    color: "from-red-500 to-rose-600",
                  },
                  {
                    name: "ICICI Bank",
                    rate: "11.2%",
                    amount: "₹800000",
                    color: "from-amber-400 to-orange-500",
                  },
                ].map((bank, index) => (
                  <div
                    key={bank.name}
                    className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bank.color} flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform`}
                      >
                        {bank.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {bank.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          Interest: {bank.rate}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">
                        {bank.amount}
                      </div>
                      <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                        APPLY
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="How it works video"
            className="relative w-[90%] max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-white p-2 shadow hover:bg-slate-100"
            >
              <X className="w-5 h-5 text-slate-700" />
            </button>

            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="How it works"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 text-center font-semibold text-slate-700">
              How it works – Demo
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
