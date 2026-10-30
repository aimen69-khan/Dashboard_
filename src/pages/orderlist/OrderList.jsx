import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderList.css";
import { BadgeCheck } from "lucide-react";
import { adminAPI } from "../../api/client";

const statusClass = {
  Delivered: "ol-status delivered",
  Pending: "ol-status pending",
  Confirmed: "ol-status pending",
  Processing: "ol-status pending",
  Shipped: "ol-status pending",
  Cancelled: "ol-status cancelled",
};

export default function OrderList() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminAPI.orders()
      .then((data) => setOrders(data.orders || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const goToOrder = (order) => {
    navigate(`/order/${order._id || order.id}`, {
      state: {
        name: order.shippingInfo?.fullName || order.user?.name,
        email: order.shippingInfo?.email || order.user?.email,
        order,
      },
    });
  };

  const updateStatus = async (e, orderId, status) => {
    e.stopPropagation();
    try {
      await adminAPI.updateOrderStatus(orderId, status);
      setOrders((prev) =>
        prev.map((o) =>
          (o._id || o.id) === orderId ? { ...o, status } : o
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="ol-page">
      <div className="ol-card">
        <div className="ol-header">
          <div className="ol-title">Order Lists</div>
        </div>

        {loading ? (
          <p style={{ padding: 20 }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ padding: 20 }}>No orders yet.</p>
        ) : (
          <table className="ol-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => {
                const itemCount = order.orderItems?.length || 0;
                const amount = order.total || 0;
                const status = order.status || "Pending";
                const name = order.shippingInfo?.fullName || order.user?.name || "Customer";
                const email = order.shippingInfo?.email || order.user?.email || "";

                return (
                  <tr
                    key={order._id || order.id}
                    className="ol-row"
                    onClick={() => goToOrder(order)}
                  >
                    <td className="ol-index">{idx + 1}</td>
                    <td>
                      <div className="ol-profile">
                        <div>
                          <div className="ol-name">{name}</div>
                          <div className="ol-email">{email}</div>
                        </div>
                      </div>
                    </td>
                    <td>{order.orderNumber}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{itemCount}</td>
                    <td>${amount}</td>
                    <td>
                      <span className={statusClass[status] || "ol-status pending"}>
                        {status}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        value={status}
                        onChange={(e) => updateStatus(e, order._id || order.id, e.target.value)}
                        style={{ padding: 4, borderRadius: 4 }}
                      >
                        {["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
