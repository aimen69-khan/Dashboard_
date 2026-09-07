import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderList.css";
import { BadgeCheck } from "lucide-react";
import { ordersData } from "../../components/orderdata/OrderData";

const statusFromItems = (items) => {
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);
  if (totalQty === 0) return "Cancelled";
  if (totalQty <= 2) return "Pending";
  return "Delivered";
};

const statusClass = {
  Delivered: "ol-status delivered",
  Pending: "ol-status pending",
  Cancelled: "ol-status cancelled",
};

export default function OrderList() {
  const navigate = useNavigate();

  const goToOrder = (order) => {
    navigate(`/order/${order.id}`, {
      state: {
        name: order.name,
        verified: order.verified,
        email: order.email,
        avatar: order.avatar,
        country: order.country,
      },
    });
  };

  return (
    <div className="ol-page">
      <div className="ol-card">
        <div className="ol-header">
          <div className="ol-title">Order Lists</div>
        </div>

        <table className="ol-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User Profile</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => {
              const itemCount = order.items.length;
              const amount = order.items.reduce(
                (sum, item) => sum + item.price * item.qty,
                0
              );
              const status = statusFromItems(order.items);

              return (
                <tr
                  key={order.id}
                  className="ol-row"
                  onClick={() => goToOrder(order)}
                >
                  <td className="ol-index">{order.id}</td>
                  <td>
                    <div className="ol-profile">
                      <img src={order.avatar} alt={order.name} />
                      <div>
                        <div className="ol-name">
                          {order.name}
                          {order.verified && (
                            <BadgeCheck size={15} className="ol-verified" />
                          )}
                        </div>
                        <div className="ol-email">{order.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="ol-order-id">{order.orderId}</td>
                  <td>{order.date}</td>
                  <td>{itemCount}</td>
                  <td className="ol-amount">${amount.toLocaleString()}</td>
                  <td>
                    <span className={statusClass[status]}>{status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}