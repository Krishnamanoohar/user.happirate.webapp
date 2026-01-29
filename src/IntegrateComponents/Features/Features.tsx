import { useEffect, useRef, useState } from 'react'
import { 
  Shield, 
  Zap, 
  Clock, 
  Users, 
  FileCheck, 
  HeadphonesIcon,
  ArrowRight,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  delay: number
  isVisible: boolean
}

function FeatureCard({ icon, title, description, gradient, delay, isVisible }: FeatureCardProps) {
  return (
    <div
      className={`group relative bg-white rounded-3xl p-6 lg:p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-indigo-200/50 transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Gradient Border Effect */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Icon */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>

      {/* Learn More Link */}
      <div className="mt-5 flex items-center gap-2 text-indigo-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm">Learn more</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  )
}

const features = [
  {
    icon: <Shield className="w-7 h-7 text-white" />,
    title: '100% Secure',
    description: 'Your data is protected with bank-level encryption. We never share your information with third parties without consent.',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    icon: <Zap className="w-7 h-7 text-white" />,
    title: 'Instant Approval',
    description: 'Get loan approval in minutes, not days. Our AI-powered system evaluates your application instantly.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: <Clock className="w-7 h-7 text-white" />,
    title: '24/7 Availability',
    description: 'Apply for loans anytime, anywhere. Our platform is always open for your convenience.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: <Users className="w-7 h-7 text-white" />,
    title: 'Expert Guidance',
    description: 'Our loan experts are available to help you choose the best option for your needs.',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: <FileCheck className="w-7 h-7 text-white" />,
    title: 'Minimal Documentation',
    description: 'Apply with just basic KYC documents. No lengthy paperwork or physical visits required.',
    gradient: 'from-rose-500 to-orange-600',
  },
  {
    icon: <HeadphonesIcon className="w-7 h-7 text-white" />,
    title: 'Dedicated Support',
    description: 'Get personalized assistance throughout your loan journey from application to disbursement.',
    gradient: 'from-orange-500 to-amber-600',
  },
]

export default function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 mb-4">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Why Choose Us</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Features That Make Us <span className="gradient-text">Stand Out</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            We combine cutting-edge technology with customer-centric service to provide 
            you with the best loan comparison experience in India.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-card rounded-3xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Ready to Find Your Perfect Loan?
            </h3>
            <p className="text-slate-600 mb-8 max-w-xl mx-auto">
              Join over 50,000 satisfied customers who found their ideal loan through Happirate.
              Start comparing now and save on your EMIs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="gradient-bg text-white font-semibold px-8 py-6 rounded-full hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 group"
              >
                Compare Loans Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="border-2 border-slate-200 text-slate-700 font-semibold px-8 py-6 rounded-full hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300"
              >
                Talk to an Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
