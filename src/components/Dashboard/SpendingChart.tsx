import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SpendingChartProps {
  spendingData: Record<string, number>;
}

const PAYTM_COLORS = ['#00BAF2', '#002970', '#00D4FF', '#0F4A8C', '#22C55E', '#F59E0B'];

export const SpendingChart: React.FC<SpendingChartProps> = ({ spendingData }) => {
  const data = Object.entries(spendingData).map(([category, amount]) => ({
    name: category,
    value: amount,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-paytm-lg border border-gray-100">
          <p className="font-semibold text-gray-900">{payload[0].name}</p>
          <p className="text-paytm-blue font-bold">₹{payload[0].value.toLocaleString()}</p>
          <p className="text-xs text-gray-500">
            {((payload[0].value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null; // Don't show labels for slices less than 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Spending Breakdown</h3>
          <p className="text-sm text-gray-500">Current month expenses by category</p>
        </div>
        <div className="px-3 py-1 bg-paytm-lightBlue text-paytm-blue text-xs font-medium rounded-full">
          This Month
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PAYTM_COLORS[index % PAYTM_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: PAYTM_COLORS[index % PAYTM_COLORS.length] }}
            />
            <span className="text-sm text-gray-700 truncate">{entry.name}</span>
            <span className="text-sm font-semibold text-gray-900 ml-auto">
              ₹{entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};