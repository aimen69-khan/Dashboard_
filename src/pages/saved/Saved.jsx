import React, { useEffect, useState } from "react";
import "./Saved.css";
import { Trash2, BadgeCheck } from "lucide-react";

const statusClass = {
  Active: "sv-status active",
  Pending: "sv-status pending",
  Rejected: "sv-status rejected",
};

const SAVED_KEY = "dashstack_saved_users";

export default function Saved() {
  const [savedUsers, setSavedUsers] = useState([]);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
    setSavedUsers(existing);
  }, []);

  const handleRemove = (id) => {
    const updated = savedUsers.filter((user) => user.id !== id);
    setSavedUsers(updated);
    localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
  };

  return (
    <div className="sv-page">
      <div className="sv-card">
        <div className="sv-header">
          <div className="sv-title">Saved Users</div>
        </div>

        <table className="sv-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Profile</th>
              <th>Country</th>
              <th>Friends</th>
              <th>Followers</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {savedUsers.map((user) => (
              <tr key={user.id}>
                <td className="sv-index">{user.id}</td>
                <td>
                  <div className="sv-profile">
                    <img src={user.avatar} alt={user.name} />
                    <div>
                      <div className="sv-name">
                        {user.name}
                        {user.verified && <BadgeCheck size={15} className="sv-verified" />}
                      </div>
                      <div className="sv-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.country}</td>
                <td>{user.friends}</td>
                <td>{user.followers}</td>
                <td>
                  <span className={statusClass[user.status]}>{user.status}</span>
                </td>
                <td>
                  <button
                    className="sv-icon-btn delete"
                    onClick={() => handleRemove(user.id)}
                    title="Remove from saved"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}

            {savedUsers.length === 0 && (
              <tr>
                <td colSpan={7} className="sv-empty">
                  No saved users yet. Save someone from the List page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}