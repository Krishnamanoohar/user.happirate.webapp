import { 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Heart
} from 'lucide-react'
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
    { name: 'Bank Partners', href: '/#banks' },
    { name: 'Become a Partner', href: '#' },
    { name: 'Partner Login', href: '#' },
  ],
}

const socialLinks = [
  { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/happirate_/', target: "_blank", label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
        
        {/* Main Footer Content */}
        {/* FIX: Increased gap-8 to lg:gap-20 for wider horizontal spacing.
            Used lg:grid-cols-5 to give each column more breathing room.
        */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-20 py-12">
          
          {/* Brand Column - Occupies 2 columns to push others further right */}
          <div className="col-span-2">
            <div className="flex items-center mb-8">
              <a href="/" className="flex items-center group">
                <div className="bg-white p-1.5 w-16 h-16 rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                  <img 
                    src={happirateLogo} 
                    alt="Happirate" 
                    className="h-16 w-16 object-contain" 
                  />
                </div>
                <span className="font-extrabold text-4xl tracking-tight text-white ml-5">
                  Happirate
                </span>
              </a>
            </div>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              India's most trusted loan comparison platform. We help you find the best 
              loan offers from top banks with complete transparency.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:support@happirate.com" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@happirate.com</span>
              </a>
              <a href="tel:+919346521702" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 9346521702</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>

          {/* Loans Column */}
          <div className="lg:pl-4">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Loans</h4>
            <ul className="space-y-4">
              {footerLinks.loans.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="lg:pl-4">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners Column */}
          <div className="lg:pl-4">
            <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Partners</h4>
            <ul className="space-y-4">
              {footerLinks.partners.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> in India
          </p>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.target}
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>

          <p className="text-slate-500 text-sm">
            © 2026 Happirate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}