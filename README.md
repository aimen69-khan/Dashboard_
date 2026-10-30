# Admin Dashboard

React + Vite admin panel for the e-commerce system.

## Installation

```bash
cd admin-dashboard
npm install
```

## Environment

```
VITE_API_URL=http://localhost:5000/api
```

## Start

```bash
npm run dev
```

Default: `http://localhost:5174` (or next free port).

## Admin Access

On open, a full-screen **Enter Secret Password** screen appears.

Development password: **secret123**

Correct password unlocks the dashboard and stores an admin JWT for API calls.

## Features

- Live dashboard stats (users, orders, revenue, pending)
- Product CRUD (add / edit / delete)
- Order list with status updates (Pending → Delivered / Cancelled)
- Connected to MongoDB via backend

## Security

Secret password is verified by the backend (`ADMIN_SECRET_PASSWORD`). Do not hard-code it in frontend production builds; use the API.
