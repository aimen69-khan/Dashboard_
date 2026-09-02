import React from "react";
import "./Statcards.css";
import { Users, Package, TrendingUp, Clock, ArrowUp, ArrowDown } from "lucide-react";

const stats = [
  {
    label: "Total User",
    value: "40,689",
    change: "8.5% Up from yesterday",
    trend: "up",
    icon: Users,
    iconBg: "#E7E4FB",
    iconColor: "#6C5DD3",
  },
  {
    label: "Total Order",
    value: "10293",
    change: "1.3% Up from past week",
    trend: "up",
    icon: Package,
    iconBg: "#FDF1DA",
    iconColor: "#E5A93B",
  },
  {
    label: "Total Sales",
    value: "$89,000",
    change: "4.3% Down from yesterday",
    trend: "down",
    icon: TrendingUp,
    iconBg: "#DDF6E8",
    iconColor: "#2ECC71",
  },
  {
    label: "Total Pending",
    value: "2040",
    change: "1.8% Up from yesterday",
    trend: "up",
    icon: Clock,
    iconBg: "#FCE4E4",
    iconColor: "#F0645A",
  },
];

export default function StatCards() {
  return (
    <div className="ds-stats">
      {stats.map(({ label, value, change, trend, icon: Icon, iconBg, iconColor }) => (
        <div className="ds-stat-card" key={label}>
          <div className="ds-stat-top">
            <div className="ds-stat-label">{label}</div>
            <div className="ds-stat-icon" style={{ background: iconBg, color: iconColor }}>
              <Icon size={18} />
            </div>
          </div>
          <div className="ds-stat-value">{value}</div>
          <div className={`ds-stat-change ${trend}`}>
            {trend === "up" ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
            {change}
          </div>
        </div>
      ))}
    </div>
  );
}