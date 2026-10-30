import React from "react";
import "./Saleschart.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { x: "5k", y: 22 },
  { x: "10k", y: 35 },
  { x: "15k", y: 48 },
  { x: "20k", y: 32 },
  { x: "20k+", y: 78 },
  { x: "25k", y: 40 },
  { x: "30k", y: 55 },
  { x: "35k", y: 24 },
  { x: "40k", y: 30 },
  { x: "45k", y: 68 },
  { x: "45k+", y: 58 },
  { x: "50k", y: 62 },
  { x: "55k", y: 45 },
  { x: "60k", y: 60 },
  { x: "60k+", y: 50 },
];

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="ds-chart-tooltip">64,3664.77</div>
    );
  }
  return null;
}

export default function SalesChart() {
  return (
    <div className="ds-chart-card">
      <div className="ds-chart-header">
        <div className="ds-chart-title">Sales Details</div>
        <button className="ds-chart-filter">
          October
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="#9098A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="ds-chart-body">
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 30, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="dsSalesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6C5DD3" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#6C5DD3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f0f1f5" />
            <XAxis
              dataKey="x"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#b2b6c2", fontSize: 11 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#b2b6c2", fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#d8d4f7", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="y"
              stroke="#6C5DD3"
              strokeWidth={2.5}
              fill="url(#dsSalesFill)"
              dot={{ r: 4, fill: "#6C5DD3", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}