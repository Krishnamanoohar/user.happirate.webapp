import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Heart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerLinks = {
  loans: [
    { name: 'Personal Loan', href: '#' },
    { name: 'Home Loan', href: '#' },
    { name: 'Car Loan', href: '#' },
    { name: 'Education Loan', href: '#' },
    { name: 'Business Loan', href: '#' },
  ],
  company: [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  resources: [
    { name: 'EMI Calculator', href: '#emi-calculator' },
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
  { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-bg" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative">
        {/* Top Section - Newsletter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-800">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-slate-400">
              Get the latest loan offers and financial tips delivered to your inbox
            </p>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 w-full lg:w-72"
            />
            <Button className="gradient-bg text-white font-semibold px-6 rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 group flex-shrink-0">
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 py-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="font-bold text-xl tracking-tight">HAPPIRATE</span>
            </a>
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
              <a href="tel:+911800123456" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">1800-123-4567</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Loans Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Loans</h4>
            <ul className="space-y-3">
              {footerLinks.loans.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners Column */}
          <div>
            <h4 className="font-semibold text-white mb-4">Partners</h4>
            <ul className="space-y-3">
              {footerLinks.partners.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
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
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
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
