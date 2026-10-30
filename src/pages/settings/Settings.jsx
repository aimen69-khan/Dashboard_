import React, { useState, useEffect } from 'react';
import './Settings.css';

export default function Settings() {
  const [email, setEmail] = useState(
    () => localStorage.getItem('adminEmail') || 'admin@gmail.com'
  );
  const [displayName, setDisplayName] = useState('Admin');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('adminSettings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.displayName) setDisplayName(parsed.displayName);
        if (typeof parsed.notifications === 'boolean')
          setNotifications(parsed.notifications);
        if (typeof parsed.darkMode === 'boolean') setDarkMode(parsed.darkMode);
        if (parsed.email) setEmail(parsed.email);
      } catch {
        /* ignore */
      }
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const settings = { email, displayName, notifications, darkMode };
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    localStorage.setItem('adminEmail', email);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and dashboard preferences</p>
      </div>

      <form className="settings-card" onSubmit={handleSave}>
        <section className="settings-section">
          <h2>Profile</h2>
          <div className="settings-field">
            <label htmlFor="settings-name">Display Name</label>
            <input
              id="settings-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div className="settings-field">
            <label htmlFor="settings-email">Email</label>
            <input
              id="settings-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
            />
          </div>
        </section>

        <section className="settings-section">
          <h2>Preferences</h2>
          <div className="settings-toggle-row">
            <div>
              <span className="toggle-label">Email notifications</span>
              <span className="toggle-desc">
                Receive updates about orders and activity
              </span>
            </div>
            <button
              type="button"
              className={`toggle ${notifications ? 'on' : ''}`}
              onClick={() => setNotifications((v) => !v)}
              aria-pressed={notifications}
            >
              <span className="toggle-knob" />
            </button>
          </div>
          <div className="settings-toggle-row">
            <div>
              <span className="toggle-label">Dark mode</span>
              <span className="toggle-desc">
                Use a darker theme for the dashboard
              </span>
            </div>
            <button
              type="button"
              className={`toggle ${darkMode ? 'on' : ''}`}
              onClick={() => setDarkMode((v) => !v)}
              aria-pressed={darkMode}
            >
              <span className="toggle-knob" />
            </button>
          </div>
        </section>

        <section className="settings-section">
          <h2>Security</h2>
          <p className="settings-hint">
            Demo login credentials are fixed for this build:
          </p>
          <div className="settings-demo-box">
            <div>
              <span className="label">Email</span>
              <span>admin@gmail.com</span>
            </div>
            <div>
              <span className="label">Password</span>
              <span>admin123</span>
            </div>
          </div>
        </section>

        <div className="settings-actions">
          <button type="submit" className="settings-save-btn">
            Save changes
          </button>
          {saved && (
            <span className="settings-saved-msg">Settings saved successfully</span>
          )}
        </div>
      </form>
    </div>
  );
}
