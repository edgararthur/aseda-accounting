import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', revenue: 65000, expenses: 45000 },
  { month: 'Feb', revenue: 72000, expenses: 48000 },
  { month: 'Mar', revenue: 84000, expenses: 52000 },
  { month: 'Apr', revenue: 78000, expenses: 49000 },
  { month: 'May', revenue: 92000, expenses: 56000 },
  { month: 'Jun', revenue: 88000, expenses: 53000 },
];

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          stroke="#4F46E5" 
          fillOpacity={1} 
          fill="url(#colorRevenue)" 
          name="Revenue"
        />
        <Area 
          type="monotone" 
          dataKey="expenses" 
          stroke="#EF4444" 
          fillOpacity={1} 
          fill="url(#colorExpenses)" 
          name="Expenses"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}