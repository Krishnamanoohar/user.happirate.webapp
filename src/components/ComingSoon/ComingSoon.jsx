import React, { useState } from "react";
import { Mail, ArrowRight, Instagram, Linkedin, Twitter, Rocket } from "lucide-react";
// import happirateLogo from "../../../assets/images/happirateLogo.png";
import happirateLogo from '../../assets/images/happirateLogo.png';

const ComingSoonPage = () => {
//   const [email, setEmail] = useState("");


  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-4 overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-violet-200/30 rounded-full blur-3xl animate-pulse" />

      {/* Logo Section */}
      {/* <div className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center">
        <img src={happirateLogo} alt="Happirate" className="h-12 w-12" />
        <span className="font-bold text-2xl tracking-tight text-slate-900 ml-1">
          Happirate
        </span>
      </div> */}

      {/* Main Content */}
      <div className="max-w-3xl w-full text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-[#7c3aed] text-sm font-bold mb-8 animate-bounce">
          <Rocket className="w-4 h-4" />
          <span>Something big is coming!</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
          We're Crafting Your <br />
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400 bg-clip-text text-transparent">Financial Future</span>
        </h1>

        <p className="text-slate-600 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
          Our team is working hard to bring you the most transparent and 
          intelligent loan comparison platform in India. Stay tuned!
        </p>

        {/* Subscription Box
        <div className="bg-white p-2 rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-100 max-w-lg mx-auto transform transition-all hover:scale-[1.01]">
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-[#7c3aed]/20 outline-none text-slate-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 active:scale-95"
            >
              Notify Me
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        </div> */}

        {/* Progress bar hint */}
        <div className="mt-12 max-w-xs mx-auto">
           <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
             <span>Development</span>
             <span>85%</span>
           </div>
           <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
             <div className="h-full bg-[#7c3aed] rounded-full w-[85%] transition-all duration-1000 shadow-[0_0_10px_rgba(124,58,237,0.5)]"></div>
           </div>
        </div>
      </div>

      {/* Social Footer */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <p className="text-slate-400 text-sm font-medium">Follow our journey</p>
        <div className="flex gap-6">
          <a  href="https://www.instagram.com/happirate_/" target="_blank" className="text-slate-400 hover:text-[#7c3aed] transition-colors">
            <Instagram className="w-6 h-6" />
          </a>
          {/* <a href="#" className="text-slate-400 hover:text-[#7c3aed] transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-[#7c3aed] transition-colors">
            <Twitter className="w-6 h-6" />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;