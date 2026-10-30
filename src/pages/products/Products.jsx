import React, { useState, useEffect } from "react";
import "./Products.css";
import { Plus, X, Package } from "lucide-react";
import { adminAPI } from "../../api/client";

const CATEGORIES = [
  "new-arrivals",
  "top-selling",
  "casual",
  "formal",
  "party",
  "gym",
  "Wearables",
  "Audio",
  "Laptops",
  "Tablets",
  "E-Readers",
  "Shoes",
  "Glasses",
  "Perfumes",
  "Other",
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "new-arrivals",
    description: "",
    image: "",
  });

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await adminAPI.products();
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({
      name: "",
      price: "",
      stock: "50",
      category: "new-arrivals",
      description: "",
      image: "",
    });
    setError("");
    setShowModal(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name || "",
      price: String(p.price ?? ""),
      stock: String(p.stock ?? 0),
      category: p.category || "Other",
      description: p.description || "",
      image: (p.images && p.images[0]) || "",
    });
    setError("");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = {
        name: form.name.trim(),
        price: Number(form.price),
        stock: Number(form.stock),
        category: form.category || "Other",
        description: form.description.trim() || form.name.trim(),
        images: form.image.trim() ? [form.image.trim()] : [],
        rating: 4.5,
        ratingCount: 0,
        sizes: ["Small", "Medium", "Large", "X-Large"],
        colors: [{ name: "Default", hex: "#111111" }],
        breadcrumbs: ["Home", form.category || "Shop", form.name.trim()],
      };

      if (!body.name || isNaN(body.price) || body.price < 0 || isNaN(body.stock)) {
        setError("Please fill name, price, and stock correctly.");
        setSaving(false);
        return;
      }

      if (editing) {
        await adminAPI.updateProduct(editing._id || editing.id, body);
      } else {
        await adminAPI.createProduct(body);
      }
      setShowModal(false);
      await load();
    } catch (err) {
      setError(err.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await adminAPI.deleteProduct(id);
      await load();
    } catch (err) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div className="pr-page">
      <div className="pr-toolbar">
        <div className="pr-title">Products</div>
        <button type="button" className="pr-add-btn" onClick={openAdd}>
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {error && !showModal && (
        <div style={{ color: "#f0645a", marginBottom: 12, fontSize: 13 }}>{error}</div>
      )}

      {loading ? (
        <p style={{ padding: 20 }}>Loading products...</p>
      ) : products.length === 0 ? (
        <p style={{ padding: 20 }}>No products yet. Click Add Product.</p>
      ) : (
        <div className="pr-grid">
          {products.map((p) => {
            const id = p._id || p.id;
            const img = p.images?.[0];
            const low = (p.stock ?? 0) <= 10;
            return (
              <div className="pr-card" key={id}>
                <div className="pr-image-wrap">
                  {img ? (
                    <img
                      src={img}
                      alt={p.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#bbb",
                      }}
                    >
                      <Package size={36} />
                    </div>
                  )}
                  <span className="pr-category">{p.category}</span>
                </div>
                <div className="pr-card-body">
                  <div className="pr-name">{p.name}</div>
                  <div className="pr-meta-row">
                    <span className="pr-price">${p.price}</span>
                    <span className={`pr-stock${low ? " low" : ""}`}>
                      Stock: {p.stock}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      style={{
                        flex: 1,
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: "1px solid #eef0f4",
                        background: "#fff",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(id)}
                      style={{
                        flex: 1,
                        padding: "6px 8px",
                        borderRadius: 6,
                        border: "1px solid #fce4e4",
                        background: "#fff5f5",
                        color: "#f0645a",
                        cursor: "pointer",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <div className="pr-modal-overlay" onClick={() => !saving && setShowModal(false)}>
          <div className="pr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pr-modal-header">
              <div className="pr-modal-title">
                {editing ? "Edit Product" : "Add Product"}
              </div>
              <button
                type="button"
                className="pr-modal-close"
                onClick={() => !saving && setShowModal(false)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <form className="pr-modal-form" onSubmit={handleSubmit}>
              {error && (
                <div style={{ color: "#f0645a", fontSize: 13, marginBottom: 4 }}>
                  {error}
                </div>
              )}

              <label className="pr-field">
                Name
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Product name"
                />
              </label>

              <div className="pr-field-row">
                <label className="pr-field">
                  Price ($)
                  <input
                    required
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="0.00"
                  />
                </label>
                <label className="pr-field">
                  Stock
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    placeholder="50"
                  />
                </label>
              </div>

              <label className="pr-field">
                Category
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  style={{
                    border: "1px solid #eef0f4",
                    borderRadius: 8,
                    padding: "10px 12px",
                    fontSize: 13.5,
                    color: "#1a1d29",
                    background: "#fff",
                  }}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="pr-field">
                Description
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Product description"
                  rows={3}
                  style={{
                    border: "1px solid #eef0f4",
                    borderRadius: 8,
                    padding: "10px 12px",
                    fontSize: 13.5,
                    color: "#1a1d29",
                    resize: "vertical",
                    fontFamily: "inherit",
                  }}
                />
              </label>

              <label className="pr-field">
                Image URL
                <input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://example.com/image.jpg or /images/cart-1.png"
                />
              </label>

              <div className="pr-modal-actions">
                <button
                  type="button"
                  className="pr-modal-cancel"
                  onClick={() => !saving && setShowModal(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button type="submit" className="pr-modal-submit" disabled={saving}>
                  {saving ? "Saving..." : editing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
