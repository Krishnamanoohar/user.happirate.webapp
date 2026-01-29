import { useState } from 'react'
import { Menu, X, ChevronDown, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NavbarProps {
  scrollY: number
}

const navLinks = [
  { name: 'Solutions', href: '#solutions' },
  { name: 'Get In Touch', href: '#contact' },
  { name: 'EMI Calculator', href: '#emi-calculator' },
]

export default function Navbar({ scrollY }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
     
  const isScrolled = scrollY > 50

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-indigo-100/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              HAPPIRATE
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Banks Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                  <Building2 className="w-4 h-4" />
                  Banks
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-white/95 backdrop-blur-xl border-indigo-100">
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  All Banks
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  Public Sector
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  Private Banks
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  NBFCs
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  International
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-black"
              >
                {link.name}
                <span className="text-black" />
              </a>
            ))}
          </div>

          {/* Sign In Button */}
          <div className="hidden lg:block">
            <button
              className="gradient-bg text-white font-semibold px-6 py-2 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-700" />
            ) : (
              <Menu className="w-6 h-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#banks"
              className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Building2 className="w-4 h-4" />
              Banks
            </a>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-slate-700 hover:text-indigo-600 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              className="w-full gradient-bg text-white font-semibold py-3 rounded-full mt-4"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
