import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./OrderDetails.css";
import { ArrowLeft, Minus, Plus, BadgeCheck, Pencil, Trash2, Check, X } from "lucide-react";
import { ordersData } from "../orderdata/OrderData";

export default function OrderDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const matchedOrder = ordersData.find((o) => o.id === id);
  const customer = location.state || matchedOrder || ordersData[0];
  const initialItems = matchedOrder ? matchedOrder.items : ordersData[0].items;

  const [items, setItems] = useState(initialItems);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", price: "" });

  const increment = (itemId) => {
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, qty: item.qty + 1 } : item))
    );
  };

  const decrement = (itemId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, qty: Math.max(1, item.qty - 1) } : item
      )
    );
  };

  const handleDelete = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
    if (editingId === itemId) {
      setEditingId(null);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditForm({ name: item.name, price: item.price });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", price: "" });
  };

  const saveEdit = (itemId) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              name: editForm.name.trim() || item.name,
              price: Number(editForm.price) || item.price,
            }
          : item
      )
    );
    setEditingId(null);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 15 : 0;
  const total = subtotal + shipping;

  return (
    <div className="od-page">
      <button className="od-back" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} />
        Back
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

        {items.map((item) =>
          editingId === item.id ? (
            <div className="od-item-row od-item-editing" key={item.id}>
              <img src={item.image} alt={item.name} className="od-item-image" />

              <div className="od-edit-fields">
                <input
                  type="text"
                  className="od-edit-input"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Product name"
                />
                <input
                  type="number"
                  className="od-edit-input od-edit-price"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="Price"
                  min="0"
                />
              </div>

              <div className="od-edit-actions">
                <button
                  className="od-edit-btn confirm"
                  onClick={() => saveEdit(item.id)}
                  title="Save"
                >
                  <Check size={15} />
                </button>
                <button
                  className="od-edit-btn cancel"
                  onClick={cancelEdit}
                  title="Cancel"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          ) : (
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

              <div className="od-item-actions">
                <button
                  className="od-action-btn edit"
                  onClick={() => startEdit(item)}
                  title="Edit"
                >
                  <Pencil size={15} />
                </button>
                <button
                  className="od-action-btn delete"
                  onClick={() => handleDelete(item.id)}
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          )
        )}

        {items.length === 0 && (
          <div className="od-empty">No items left in this order.</div>
        )}

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