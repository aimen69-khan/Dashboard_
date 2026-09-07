import React from "react";
import "./Header.css";
import { Search, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="ds-header">
      <div className="ds-search">
        <Search size={16} />
        <input type="text" placeholder="Search" />
      </div>

      <div className="ds-header-right">
        <button className="ds-icon-btn">
          <Bell size={18} />
          <span className="ds-badge" />
        </button>

        <button className="ds-lang">
          <span className="ds-flag">🇬🇧</span>
          English
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="#9098A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="ds-profile">
          <img src="https://i.pinimg.com/736x/e3/70/f7/e370f7451f1b9dd00ac1f0e46418b1a6.jpg" alt="GoJo" />
          <div className="ds-profile-text">
            <div className="ds-profile-name">Ahmed Raza</div>
            <div className="ds-profile-role">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}