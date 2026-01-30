
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  color?: 'blue' | 'emerald' | 'rose' | 'amber';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, trend, icon, color = 'blue' }) => {
  const colorMap = {
    blue: 'border-t-blue-500 bg-blue-50/30',
    emerald: 'border-t-emerald-500 bg-emerald-50/30',
    rose: 'border-t-rose-500 bg-rose-50/30',
    amber: 'border-t-amber-500 bg-amber-50/30',
  };

  return (
    <div className={`bg-white p-6 rounded-2xl border border-gray-100 border-t-4 ${colorMap[color]} shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</h3>
        {icon && <div className={`${color === 'blue' ? 'text-blue-500' : 'text-gray-400'} opacity-80`}>{icon}</div>}
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{value}</span>
        {trend && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${trend.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
      {subtitle && <p className="mt-2 text-xs text-gray-500 font-medium">{subtitle}</p>}
    </div>
  );
};

export default StatsCard;
