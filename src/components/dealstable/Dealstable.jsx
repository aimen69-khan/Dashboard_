import React from "react";
import "./DealsTable.css";

const deals = [
  {
    id: 1,
    product: "Apple Watch",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=64&h=64&fit=crop",
    location: "6096 Marjolaine Landing",
    date: "12.09.2026 - 12:53 PM",
    piece: 423,
    amount: "$34,295",
    status: "Delivered",
  },
  {
    id: 2,
    product: "Samsung Galaxy Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=64&h=64&fit=crop",
    location: "1029 Jerde Center",
    date: "12.09.2026 - 10:24 AM",
    piece: 231,
    amount: "$21,340",
    status: "Pending",
  },
  {
    id: 3,
    product: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=64&h=64&fit=crop",
    location: "8567 Suffolk Road",
    date: "11.09.2026 - 04:12 PM",
    piece: 176,
    amount: "$16,980",
    status: "Cancelled",
  },
  {
    id: 4,
    product: "MacBook Air M3",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=64&h=64&fit=crop",
    location: "245 Kessler Common",
    date: "11.09.2026 - 09:47 AM",
    piece: 89,
    amount: "$112,610",
    status: "Delivered",
  },
];

const statusStyles = {
  Delivered: { bg: "#DDF6E8", color: "#1DAA61" },
  Pending: { bg: "#FDF1DA", color: "#E5A93B" },
  Cancelled: { bg: "#FCE4E4", color: "#F0645A" },
};

export default function DealsTable() {
  return (
    <div className="ds-deals-card">
      <div className="ds-deals-header">
        <div className="ds-chart-title">Deals Details</div>
        <button className="ds-chart-filter">
          October
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="#9098A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <table className="ds-deals-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Location</th>
            <th>Date - Time</th>
            <th>Piece</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => {
            const style = statusStyles[deal.status];
            return (
              <tr key={deal.id}>
                <td>
                  <div className="ds-product-cell">
                    <img src={deal.image} alt={deal.product} />
                    {deal.product}
                  </div>
                </td>
                <td>{deal.location}</td>
                <td>{deal.date}</td>
                <td>{deal.piece}</td>
                <td>{deal.amount}</td>
                <td>
                  <span
                    className="ds-status-pill"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {deal.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}