import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Sample data - would be fetched from API in a real app
const data = [
  { day: 'Mon', submissions: 24 },
  { day: 'Tue', submissions: 13 },
  { day: 'Wed', submissions: 29 },
  { day: 'Thu', submissions: 32 },
  { day: 'Fri', submissions: 18 },
  { day: 'Sat', submissions: 12 },
  { day: 'Sun', submissions: 10 },
];

const SubmissionsChart: React.FC = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="card"
    >
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-lg">Weekly Submissions</h3>
        <p className="text-textSecondary text-sm">Total submissions over the past week</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B4CCA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3B4CCA" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                border: 'none',
                padding: '0.5rem',
              }}
            />
            <Area
              type="monotone"
              dataKey="submissions"
              stroke="#3B4CCA"
              fillOpacity={1}
              fill="url(#colorSubmissions)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SubmissionsChart;