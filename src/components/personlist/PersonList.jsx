import React, { useState } from "react";
import "./PersonList.css";
import { Bookmark, Trash2, ChevronLeft, ChevronRight, ChevronDown, BadgeCheck } from "lucide-react";

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

export default function List() {
  const [users, setUsers] = useState(initialUsers);
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);
  const totalPages = 10;

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
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

  return (
    <div className="ls-page">
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
            {users.map((user) => (
              <tr key={user.id}>
                <td className="ls-index">{user.id}</td>
                <td>
                  <div className="ls-profile">
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

      {toast && <div className="ls-toast">{toast}</div>}
    </div>
  );
}