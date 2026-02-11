import { useEffect, useState, useRef } from "react";
import { Menu, X, ChevronDown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import happirateLogo from "../../../assets/images/happirateLogo.png";
import TextLogo from "../../../assets/images/image.png";
import { useNavigate } from "react-router-dom";
interface NavbarProps {
  scrollY: number;
}
const navLinks = [
  { name: "Solutions", href: "/#solutions" },
  { name: "Smart Compare", href: "/compare-loans" },
  // { name: "EMI Calculator", href: "#emi-calculator" },
  { name: "Credit Health", href: "/credit-health-report" },
  { name: "Get In Touch", href: "/#contact" },
];

export default function Navbar({ scrollY }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState<{
    mobile: string;
    username: string | null;
  } | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

  const isScrolled = scrollY > 50;

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/sign-in"); // Or redirect to home "/"
  };
  const handleProfile = () => {
  setIsDropdownOpen(false);
  navigate("/my-profile");
};


  // useEffect(() => {
  //   const mobile = sessionStorage.getItem("mobile_number");
  //   const name = sessionStorage.getItem("username");

  //   if (mobile) {
  //     setUser({ mobile, username: name });
  //   }
  // }, [sessionStorage.getItem("username")]);
  useEffect(() => {
    const loadUser = () => {
      const mobile = sessionStorage.getItem("mobile_number");
      const name = sessionStorage.getItem("username");

      if (mobile) {
        setUser({ mobile, username: name });
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);
    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-indigo-100/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center relative left-[-30px]">
            <a href="/" className="flex items-center ">
              <img
                src={happirateLogo}
                alt="Happirate logo"
                className="h-20 w-20"
              />

              <img
                src={TextLogo}
                alt="Happirate text logo"
                className="h-8 w-auto mt-1"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Banks Dropdown */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                  <Building2 className="w-4 h-4" />
                  Banks
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-xl border-indigo-100">
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  <span className="text-slate-700">All Banks</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  <span className="text-slate-700">Public Sector</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  <span className="text-slate-700">Private Banks</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  <span className="text-slate-700">NBFCs</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-indigo-50 cursor-pointer">
                  <span className="text-slate-700">International</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-indigo-600 font-medium transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-bg group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Sign In Button */}
          <div className="hidden lg:block relative">
            {user ? (
              // --- LOGGED IN STATE ---
              <div className="relative" ref={dropdownRef}>
                {/* Avatar Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full gradient-bg text-white bg-violet-500 font-bold text-lg flex items-center justify-center hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 focus:outline-none ring-2 ring-offset-2 ring-violet-500"
                >
                  {/* {user?.username?.charAt(0).toUpperCase()} */}
                  <User />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 origin-top-right transform transition-all duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-900 font-medium truncate">
                        {user.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.mobile}
                      </p>
                    </div>
                    <button
                      onClick={handleProfile}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-indigo-50 transition-colors duration-150 flex items-center gap-2 border border-violet-400 hover:border-violet-600 rounded-md"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center gap-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // --- LOGGED OUT STATE (Original Code) ---
              <Button
                className="gradient-bg text-white font-semibold px-6 py-2 rounded-full hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </Button>
            )}
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

            <Button
              className="w-full gradient-bg text-white font-semibold py-3 rounded-full mt-4"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>

  );
}
