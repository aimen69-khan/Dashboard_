import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderDetails.css";
import { ArrowLeft, Minus, Plus, BadgeCheck } from "lucide-react";

const defaultCustomer = {
  name: "Curtis",
  email: "wiegand@hotmail.com",
  avatar: "https://i.pravatar.cc/64?img=12",
  country: "Saucerize",
  verified: true,
};

const initialItems = [
  {
    id: "p1",
    name: "Apple Watch Series 9",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop",
    price: 429,
    qty: 1,
  },
  {
    id: "p2",
    name: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop",
    price: 348,
    qty: 2,
  },
  {
    id: "p3",
    name: "MacBook Air M3",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
    price: 1099,
    qty: 1,
  },
  {
    id: "p4",
    name: "Samsung Galaxy Watch 6",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    price: 289,
    qty: 1,
  },
];

export default function OrderDetail() {
  const location = useLocation();
  const navigate = useNavigate();

  const customer = location.state || defaultCustomer;
  const [items, setItems] = useState(initialItems);

  const increment = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decrement = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <div className="od-page">
      <button className="od-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        Back to List
      </button>

      <div className="od-header-card">
        <div className="od-customer">
          <img src={customer.avatar} alt={customer.name} />
          <div>
            <div className="od-customer-name">
              {customer.name}
              {customer.verified && <BadgeCheck size={16} className="od-verified" />}
            </div>
            <div className="od-customer-email">{customer.email}</div>
          </div>
        </div>
        {customer.country && (
          <div className="od-customer-meta">
            <span className="od-meta-label">Location</span>
            <span className="od-meta-value">{customer.country}</span>
          </div>
        )}
      </div>

      <div className="od-items-card">
        <div className="od-items-title">Order Items</div>

        {items.map((item) => (
          <div className="od-item-row" key={item.id}>
            <img src={item.image} alt={item.name} className="od-item-image" />

            <div className="od-item-info">
              <div className="od-item-name">{item.name}</div>
              <div className="od-item-price">${item.price.toLocaleString()}</div>
            </div>

            <div className="od-qty-control">
              <button
                className="od-qty-btn"
                onClick={() => decrement(item.id)}
                disabled={item.qty <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="od-qty-value">{item.qty}</span>
              <button className="od-qty-btn" onClick={() => increment(item.id)}>
                <Plus size={14} />
              </button>
            </div>

            <div className="od-item-total">
              ${(item.price * item.qty).toLocaleString()}
            </div>
          </div>
        ))}

        <div className="od-summary">
          <div className="od-summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString()}</span>
          </div>
          <div className="od-summary-row">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div className="od-summary-row od-summary-total">
            <span>Total</span>
            <span>${total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}