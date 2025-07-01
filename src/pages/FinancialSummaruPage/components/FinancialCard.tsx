import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FinancialCardProps {
  title: string;
  value: string;
  change: string;
  changePositive: boolean;
  icon: LucideIcon;
  subtitle?: string;
}

const FinancialCard: React.FC<FinancialCardProps> = ({
  title,
  value,
  change,
  changePositive,
  icon: Icon,
  subtitle
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${
          changePositive 
            ? 'from-green-400 to-blue-500' 
            : 'from-red-400 to-pink-500'
        } group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-sm font-medium px-3 py-1 rounded-full ${
          changePositive 
            ? 'bg-green-100 text-green-600' 
            : 'bg-red-100 text-red-600'
        }`}>
          {change}
        </span>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
        {subtitle && (
          <p className="text-gray-500 text-sm">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default FinancialCard;