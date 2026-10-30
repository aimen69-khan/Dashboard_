import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PersonList.css";
import {
  Bookmark,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BadgeCheck,
  Plus,
  X,
} from "lucide-react";

const initialUsers = [
  {
    id: "01",
    name: "Curtis",
    verified: true,
    email: "wiegand@hotmail.com",
    avatar: "https://i.pravatar.cc/64?img=12",
    country: "Saucerize",
    friends: 834,
    followers: 3645,
    status: "Active",
  },
  {
    id: "02",
    name: "Xavier",
    verified: false,
    email: "tyrell86@company.com",
    avatar: "https://i.pravatar.cc/64?img=33",
    country: "South Bradfordstad",
    friends: 634,
    followers: 2345,
    status: "Pending",
  },
  {
    id: "03",
    name: "Lola",
    verified: false,
    email: "aufderhar56@yahoo.com",
    avatar: "https://i.pravatar.cc/64?img=45",
    country: "North Tannermouth",
    friends: 164,
    followers: 9345,
    status: "Rejected",
  },
  {
    id: "04",
    name: "Milton",
    verified: false,
    email: "dikinson49@hotmail.com",
    avatar: "https://i.pravatar.cc/64?img=51",
    country: "North Anika",
    friends: 684,
    followers: 3654,
    status: "Pending",
  },
  {
    id: "05",
    name: "Lysanne",
    verified: true,
    email: "zack.turner49@company.com",
    avatar: "https://i.pravatar.cc/64?img=14",
    country: "Betteland",
    friends: 842,
    followers: 5863,
    status: "Active",
  },
  {
    id: "06",
    name: "Bonita",
    verified: false,
    email: "keebler57@company.com",
    avatar: "https://i.pravatar.cc/64?img=25",
    country: "Alexburgh",
    friends: 543,
    followers: 8965,
    status: "Rejected",
  },
  {
    id: "07",
    name: "Retta",
    verified: true,
    email: "mathew92@yahoo.com",
    avatar: "https://i.pravatar.cc/64?img=48",
    country: "East Bryceland",
    friends: 871,
    followers: 9321,
    status: "Active",
  },
  {
    id: "08",
    name: "Zoie",
    verified: false,
    email: "hulda1@hotmail.com",
    avatar: "https://i.pravatar.cc/64?img=39",
    country: "Beattytown",
    friends: 354,
    followers: 1686,
    status: "Pending",
  },
  {
    id: "09",
    name: "Easton",
    verified: true,
    email: "hilpert66@hotmail.com",
    avatar: "https://i.pravatar.cc/64?img=53",
    country: "North Pedromouth",
    friends: 546,
    followers: 9562,
    status: "Active",
  },
  {
    id: "10",
    name: "Brianne",
    verified: true,
    email: "noe45@hotmail.com",
    avatar: "https://i.pravatar.cc/64?img=29",
    country: "New Alexanderborough",
    friends: 1482,
    followers: 10865,
    status: "Active",
  },
];

const statusClass = {
  Active: "ls-status active",
  Pending: "ls-status pending",
  Rejected: "ls-status rejected",
};

const SAVED_KEY = "dashstack_saved_users";
const ADDED_KEY = "dashstack_added_users";

const emptyForm = {
  name: "",
  email: "",
  country: "",
  friends: "",
  followers: "",
  status: "Active",
};

export default function List() {
  const navigate = useNavigate();
  const [addedUsers, setAddedUsers] = useState([]);
  const [users, setUsers] = useState(initialUsers);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const totalPages = 10;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(ADDED_KEY)) || [];
    setAddedUsers(stored);
    setUsers([...stored, ...initialUsers]);
  }, []);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));

    const stillAdded = addedUsers.filter((user) => user.id !== id);
    if (stillAdded.length !== addedUsers.length) {
      setAddedUsers(stillAdded);
      localStorage.setItem(ADDED_KEY, JSON.stringify(stillAdded));
    }
  };

  const handleSave = (user) => {
    const existing = JSON.parse(localStorage.getItem(SAVED_KEY)) || [];
    const alreadySaved = existing.some((u) => u.id === user.id);

    if (alreadySaved) {
      setToast(`${user.name} is already saved`);
    } else {
      const updated = [...existing, user];
      localStorage.setItem(SAVED_KEY, JSON.stringify(updated));
      setToast(`${user.name} saved`);
    }

    setTimeout(() => setToast(null), 2000);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    const newUser = {
      id: `new-${Date.now()}`,
      name: form.name.trim(),
      verified: false,
      email: form.email.trim(),
      avatar: `https://i.pravatar.cc/64?u=${Date.now()}`,
      country: form.country.trim() || "Unknown",
      friends: Number(form.friends) || 0,
      followers: Number(form.followers) || 0,
      status: form.status,
    };

    const updatedAdded = [newUser, ...addedUsers];
    setAddedUsers(updatedAdded);
    localStorage.setItem(ADDED_KEY, JSON.stringify(updatedAdded));

    setUsers((prev) => [newUser, ...prev]);

    setForm(emptyForm);
    setShowModal(false);
    setToast(`${newUser.name} added`);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="ls-page">
      <div className="ls-toolbar">
        <button className="ls-add-btn" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add New
        </button>
      </div>

      <div className="ls-card">
        <table className="ls-table">
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
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="ls-index">{String(index + 1).padStart(2, "0")}</td>
                <td>
                  <div
                    className="ls-profile ls-profile-clickable"
                    onClick={() => navigate(`/order/${user.id}`, { state: user })}
                    title="View order details"
                  >
                    <img src={user.avatar} alt={user.name} />
                    <div>
                      <div className="ls-name">
                        {user.name}
                        {user.verified && <BadgeCheck size={15} className="ls-verified" />}
                      </div>
                      <div className="ls-email">{user.email}</div>
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
                  <div className="ls-actions">
                    <button
                      className="ls-icon-btn save"
                      onClick={() => handleSave(user)}
                      title="Save"
                    >
                      <Bookmark size={15} />
                    </button>
                    <button
                      className="ls-icon-btn delete"
                      onClick={() => handleDelete(user.id)}
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={7} className="ls-empty">
                  No users left in the list.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="ls-footer-bar">
          <div className="ls-pagination">
            <button
              className="ls-page-arrow"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft size={16} />
            </button>

            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                className={`ls-page-num ${page === n ? "active" : ""}`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}

            <span className="ls-page-dots">…</span>

            <button
              className={`ls-page-num ${page === totalPages ? "active" : ""}`}
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>

            <button
              className="ls-page-arrow"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <button className="ls-rows-select">
            10 Rows
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="ls-page-footer">
        <div>
          © All rights reserved <a href="#">CodedThemes</a>
        </div>
        <div className="ls-footer-links">
          <a href="#">License</a>
          <a href="#">Hire us</a>
          <a href="#">Terms</a>
          <a href="#">Figma Design System</a>
        </div>
      </div>

      {showModal && (
        <div className="ls-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="ls-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ls-modal-header">
              <div className="ls-modal-title">Add New User</div>
              <button className="ls-modal-close" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="ls-modal-form" onSubmit={handleAddSubmit}>
              <label className="ls-field">
                <span>Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="e.g. Jordan Lee"
                  required
                />
              </label>

              <label className="ls-field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleFormChange("email", e.target.value)}
                  placeholder="e.g. jordan@company.com"
                  required
                />
              </label>

              <label className="ls-field">
                <span>Country</span>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => handleFormChange("country", e.target.value)}
                  placeholder="e.g. New Lisbon"
                />
              </label>

              <div className="ls-field-row">
                <label className="ls-field">
                  <span>Friends</span>
                  <input
                    type="number"
                    value={form.friends}
                    onChange={(e) => handleFormChange("friends", e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </label>

                <label className="ls-field">
                  <span>Followers</span>
                  <input
                    type="number"
                    value={form.followers}
                    onChange={(e) => handleFormChange("followers", e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </label>
              </div>

              <label className="ls-field">
                <span>Status</span>
                <select
                  value={form.status}
                  onChange={(e) => handleFormChange("status", e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <div className="ls-modal-actions">
                <button
                  type="button"
                  className="ls-modal-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ls-modal-submit">
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {toast && <div className="ls-toast">{toast}</div>}
    </div>
  );
}