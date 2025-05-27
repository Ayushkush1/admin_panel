import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClass?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend, 
  colorClass = "from-primary-500 to-primary-600"
}) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="card flex flex-col h-full"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-textSecondary text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl font-heading font-bold">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                trend.isPositive ? "bg-accent-100 text-accent-700" : "bg-danger-100 text-danger-700"
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs ml-2 text-textSecondary">vs last week</span>
            </div>
          )}
        </div>
        
        <div className={cn(
          "p-3 rounded-2xl bg-gradient-to-r text-white",
          colorClass
        )}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;