import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { client: 'Tech Corp', amount: 5400 },
  { client: 'Global Inc', amount: 3200 },
  { client: 'Start Up', amount: 2800 },
  { client: 'Big Co', amount: 1900 },
  { client: 'Small Biz', amount: 1600 },
];

export function OutstandingChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="client" />
        <YAxis />
        <Tooltip 
          contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Outstanding']}
        />
        <Bar 
          dataKey="amount" 
          fill="#F59E0B"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}