import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Sidebar.css";

const mainNav = [
  { label: "Dashboard", path: "/" },
  { label: "Products" },
  { label: "Favorites" },
  { label: "Inbox" },
  { label: "Order Lists" },
  { label: "Product Stock" },
];

const pagesNav = [
  { label: "Pricing" },
  { label: "List", path: "/list" },
  { label: "Saved", path: "/saved" },
  { label: "Contact" },
  { label: "Invoice" },
  { label: "UI Elements" },
  { label: "Team" },
  { label: "Table" },
];

export default function SideBar() {
  const [active, setActive] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (item) => {
    setActive(item.label);
    if (item.path) {
      navigate(item.path);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <button className="ds-mobile-toggle" onClick={() => setMobileOpen(true)}>
        <Menu size={20} />
      </button>

      {mobileOpen && (
        <div className="ds-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <div className={`ds-sidebar ${mobileOpen ? "open" : ""}`}>
        <button className="ds-mobile-close" onClick={() => setMobileOpen(false)}>
          <X size={20} />
        </button>

        <div className="ds-logo">
          <div className="ds-logo-mark" />
          <div className="ds-logo-text">
            Dash<span className="accent">Stack</span>
          </div>
        </div>

        <nav className="ds-nav">
          {mainNav.map((item) => (
            <button
              key={item.label}
              className={`ds-item ${active === item.label ? "active" : ""}`}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ds-section-label">PAGES</div>

        <nav className="ds-nav">
          {pagesNav.map((item) => (
            <button
              key={item.label}
              className={`ds-item ${active === item.label ? "active" : ""}`}
              onClick={() => handleClick(item)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ds-bottom">
          <button
            className={`ds-item ${active === "Settings" ? "active" : ""}`}
            onClick={() => setActive("Settings")}
          >
            Settings
          </button>
          <button
            className={`ds-item ${active === "Logout" ? "active" : ""}`}
            onClick={() => setActive("Logout")}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}