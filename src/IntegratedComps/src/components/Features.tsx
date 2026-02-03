import { useEffect, useRef, useState } from "react";
import {
  Shield,
  Zap,
  Clock,
  Users,
  FileCheck,
  HeadphonesIcon,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay: number;
  isVisible: boolean;
}

function FeatureCard({
  icon,
  title,
  description,
  gradient,
  delay,
  isVisible,
}: FeatureCardProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`group relative bg-gradient-to-br from-purple-100 via-violet-100 to-indigo-100 rounded-3xl p-6 lg:p-8 shadow-lg shadow-purple-200/40 hover:shadow-xl hover:shadow-purple-300/40 transition-all duration-500 hover:-translate-y-2 border border-gray-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* ✅ FIX 1: gradient overlay must not block clicks */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
      />

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl bg-[#7c3bed] ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>

      {/* Apply Now */}
      <div
        className="mt-5 flex items-center gap-2 text-indigo-600 font-medium cursor-pointer"
        onClick={() => navigate("/sign-in")}
      >
        <span className="text-sm">Apply Now</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
}

const features = [
  {
    icon: <Shield className="w-7 h-7 text-white" />,
    title: "Personal Loan",
    description:
      "Bridge the gap between your dreams and reality. Whether you’re planning a destination wedding, a long-overdue renovation, or an unexpected adventure, we provide the capital without the wait.",
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    icon: <Zap className="w-7 h-7 text-white" />,
    title: "Business Loan",
    description:
      "Don't let cash flow hold back your ambition. Our collateral-free financing is built for the modern entrepreneur, giving you the agility to seize opportunities the moment they arise.",
    gradient: "from-violet-500 to-purple-600",
  },
  {
    icon: <Clock className="w-7 h-7 text-white" />,
    title: "Home Loan",
    description:
      "Turn someday into moving day. We offer more than just a mortgage; we offer a seamless path to homeownership with competitive rates that keep your monthly budget comfortable.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: <Users className="w-7 h-7 text-white" />,
    title: "Education Loan",
    description:
      "Your intellect is your greatest asset—don't let tuition costs stand in its way. We cover the full spectrum of your academic journey, from global travel to living expenses, so you can focus on your grades, not the bills.",
    gradient: "from-pink-500 to-rose-600",
  },
  // {
  //   icon: <FileCheck className="w-7 h-7 text-white" />,
  //   title: "Minimal Documentation",
  //   description:
  //     "Apply with just basic KYC documents. No lengthy paperwork or physical visits required.",
  //   gradient: "from-rose-500 to-orange-600",
  // },
  // {
  //   icon: <HeadphonesIcon className="w-7 h-7 text-white" />,
  //   title: "Dedicated Support",
  //   description:
  //     "Get personalized assistance throughout your loan journey from application to disbursement.",
  //   gradient: "from-orange-500 to-amber-600",
  // },
];

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className="py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 mb-4">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">
              Why Choose Us
            </span>
          </div>
          <h2 className="lg:text-4xl font-bold text-slate-900 mb-4 text-4xl">
            Solutions
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            We combine cutting-edge technology with customer-centric service to
            provide you with the best loan comparison experience in India.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 bg-pu">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              delay={index * 100}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-card rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Ready to Find Your Perfect Loan?
            </h3>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Join over 50,000 satisfied customers who found their ideal loan
              through Happirate. Start comparing now and save on your EMIs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="gradient-bg text-white font-semibold px-8 py-6 rounded-full hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 group"
              >
                Compare Loans Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-200 text-slate-700 font-semibold px-8 py-6 rounded-full hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
              >
                Talk to an Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
