import React from "react";
import { Search, Bell, Settings, User } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-5xl">
      <nav className="bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                FinancePro
              </h1>
              <p className="text-xs text-gray-500">Personal Finance</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search investments, loans, income..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all duration-200 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group">
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </button>
            <button className="p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group">
              <Settings className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </button>
            <button className="p-3 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
