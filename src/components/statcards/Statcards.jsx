import React, { useState, useEffect } from "react";
import "./Statcards.css";
import { Users, Package, TrendingUp, Clock, ArrowUp, ArrowDown } from "lucide-react";
import { adminAPI } from "../../api/client";

export default function StatCards() {
  const [stats, setStats] = useState([
    { label: "Total User", value: "—", change: "Loading...", trend: "up", icon: Users, iconBg: "#E7E4FB", iconColor: "#6C5DD3" },
    { label: "Total Order", value: "—", change: "Loading...", trend: "up", icon: Package, iconBg: "#FDF1DA", iconColor: "#E5A93B" },
    { label: "Total Sales", value: "—", change: "Loading...", trend: "up", icon: TrendingUp, iconBg: "#DDF6E8", iconColor: "#2ECC71" },
    { label: "Total Pending", value: "—", change: "Loading...", trend: "up", icon: Clock, iconBg: "#FCE4E4", iconColor: "#F0645A" },
  ]);

  useEffect(() => {
    adminAPI.dashboard()
      .then((data) => {
        const s = data.stats || {};
        setStats([
          { label: "Total User", value: String(s.totalUsers ?? 0), change: "Registered users", trend: "up", icon: Users, iconBg: "#E7E4FB", iconColor: "#6C5DD3" },
          { label: "Total Order", value: String(s.totalOrders ?? 0), change: "All orders", trend: "up", icon: Package, iconBg: "#FDF1DA", iconColor: "#E5A93B" },
          { label: "Total Sales", value: `$${(s.totalRevenue ?? 0).toLocaleString()}`, change: "Revenue", trend: "up", icon: TrendingUp, iconBg: "#DDF6E8", iconColor: "#2ECC71" },
          { label: "Total Pending", value: String(s.pendingOrders ?? 0), change: "Pending orders", trend: "up", icon: Clock, iconBg: "#FCE4E4", iconColor: "#F0645A" },
        ]);
      })
      .catch(() => {});
  }, []);

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
