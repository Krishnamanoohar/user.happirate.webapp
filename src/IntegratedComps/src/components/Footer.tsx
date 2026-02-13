import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  ArrowRight,
  Heart,
  ShieldCheck,
  Facebook,
  Twitter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import happirateLogo from '../../../assets/images/happirateLogo.png'

const footerLinks = {
  loans: [
    { name: 'Personal Loan', href: '/loan-application' },
    { name: 'Home Loan', href: '/coming-soon' },
    // { name: 'Car Loan', href: '/coming-soon' },
    { name: 'Education Loan', href: '/coming-soon' },
    { name: 'Business Loan', href: '/coming-soon' },
  ],
  resources: [
    { name: 'EMI Calculator', href: '/emi-calculator' },
    { name: 'Loan Guide', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
  partners: [
    { name: 'Bank Partners', href: '#banks' },
    { name: 'Become a Partner', href: '#' },
    { name: 'Partner Login', href: '#' },
  ],
}

const socialLinks = [
  { icon: <Instagram className="w-9 h-9" />, href: 'https://www.instagram.com/happirate_/', target: "_blank", label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#5b21b6] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7c3aed] via-[#5b21b6] to-[#2e1065] opacity-95" />

      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-indigo-400/20 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-x-16 pb-12">         
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <div className="flex items-center mb-8">
              <a href="/" className="flex items-center group">

                <div className="bg-white p-1.5 w-16 h-16 rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                  <img 
                    src={happirateLogo} 
                    alt="Happirate" 
                    /* 3. INCREASED IMAGE SIZE: Changed from h-10 w-10 to h-16 w-16
                      4. Added object-contain to ensure it doesn't stretch
                    */
                    className="h-16 w-16 object-contain" 
                  />
                </div>
                <span className="font-extrabold text-4xl tracking-tight text-white ml-5">
                  Happirate
                </span>
              </a>
            </div>
            <p className="text-violet-100/90 mb-10 max-w-sm leading-relaxed text-lg">
              India's most trusted loan comparison platform. We simplify finance 
              with transparency and speed.
            </p>
            
            {/* 3. BIG CONTACT ICONS */}
            <div className="space-y-6">
              <a href="mailto:support@happirate.com" className="flex items-center gap-5 text-violet-100/90 hover:text-white transition-all group">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-lg font-semibold tracking-wide">support@happirate.com</span>
              </a>
              <div className="flex items-center gap-5 text-violet-100/80 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="text-lg font-semibold tracking-wide">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {[
            { title: "Loans", links: footerLinks.loans },
            { title: "Resources", links: footerLinks.resources },
            { title: "Partners", links: footerLinks.partners },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-black text-white mb-8 uppercase tracking-[0.2em] text-sm opacity-80">
                {section.title}
              </h4>
              <ul className="space-y-5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-violet-100/80 hover:translate-x-3 hover:text-white transition-all text-lg font-medium inline-flex items-center group"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-white/10">
          
          <div className="flex-1 flex justify-center md:justify-start w-full">
             <p className="text-violet-100/90 text-lg font-medium">
               © 2026 Happirate. All rights reserved.
             </p>
          </div>
          
          {/* CENTERED - Made with Love (Big Heart) */}
          <div className="flex-1 flex justify-center w-full">
            <p className="text-violet-100/90 text-lg flex items-center gap-2 font-bold whitespace-nowrap">
              Made with <Heart className="w-7 h-7 text-rose-400 fill-rose-400 animate-pulse" /> in India
            </p>
          </div>
          
          {/* 4. BIG SOCIAL ICONS CONTAINER */}
          <div className="flex-1 flex justify-center md:justify-end w-full">
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.target}
                  rel="noopener noreferrer"
                  /* Wrapper increased to w-16 h-16 */
                  className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#7c3aed] transition-all duration-500 shadow-2xl hover:-translate-y-2"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}