import React, { useState } from "react";
import "./Products.css";
import { Plus, X, Package } from "lucide-react";

const initialProducts = [
  {
    id: "1",
    name: "Apple Watch Series 9",
    image: "/watch.jfif",
    price: 429,
    stock: 42,
    category: "Wearables",
  },
  {
    id: "2",
    name: "Sony WH-1000XM5",
    image: "/headphone.jfif",
    price: 348,
    stock: 18,
    category: "Audio",
  },
  {
    id: "3",
    name: "MacBook Air M3",
    image: "/laptop.jfif",
    price: 1099,
    stock: 7,
    category: "Laptops",
  },
  {
    id: "4",
    name: "Samsung Galaxy Watch 6",
    image: "/watch-2.jfif",
    price: 289,
    stock: 25,
    category: "Wearables",
  },
  {
    id: "5",
    name: "iPad Air",
    image: "/tablet.jfif",
    price: 599,
    stock: 14,
    category: "Tablets",
  },
  {
    id: "6",
    name: "AirPods Pro 2",
    image: "/airpods.jfif",
    price: 249,
    stock: 60,
    category: "Audio",
  },
  {
    id: "7",
    name: "Dell XPS 13",
    image: "/laptop-2.jfif",
    price: 999,
    stock: 9,
    category: "Laptops",
  },
  {
    id: "8",
    name: "Google Pixel Watch 2",
    image: "/watch-3.jfif",
    price: 349,
    stock: 21,
    category: "Wearables",
  },
  {
    id: "9",
    name: "Kindle Paperwhite",
    image: "/book.jfif",
    price: 39,
    stock: 33,
    category: "E-Readers",
  },
  {
    id: "10",
    name: "rainbow Shoes",
    image: "/shoes.avif",
    price: 139,
    stock: 38,
    category: "Stoes",
  },
  {
    id: "11",
    name: "Sun Glasses",
    image: "/glasses.avif",
    price: 50,
    stock: 23,
    category: "Glasses",
  },
  {
    id: "12",
    name: "Bleu De Chanel",
    image: "/perfume.avif",
    price: 40,
    stock: 28,
    category: "Perfumes",
  },
  {
    id: "13",
    name: "Airpods pro",
    image: "/airpods-2.avif",
    price: 160,
    stock: 43,
    category: "Audio",
  },
  {
    id: "14",
    name: "Gaming Keyboard",
    image: "/keyboard.avif",
    price: 190,
    stock: 23,
    category: "Keyboard",
  },
  {
    id: "15",
    name: "Gaming Mouse",
    image: "/mouse.avif",
    price: 140,
    stock: 31,
    category: "Mouse",
  },
];

const emptyForm = {
  name: "",
  price: "",
  stock: "",
  category: "",
  image: "",
};

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.price) {
      return;
    }

    const newProduct = {
      id: `new-${Date.now()}`,
      name: form.name.trim(),
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      category: form.category.trim() || "General",
      image:
        form.image.trim() ||
        `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop`,
    };

    setProducts((prev) => [newProduct, ...prev]);
    setForm(emptyForm);
    setShowModal(false);
  };

  return (
    <div className="pr-page">
      <div className="pr-toolbar">
        <div className="pr-title">Products</div>
        <button className="pr-add-btn" onClick={() => setShowModal(true)}>
          <Plus size={16} />
          Add New
        </button>
      </div>

      <div className="pr-grid">
        {products.map((product) => (
          <div className="pr-card" key={product.id}>
            <div className="pr-image-wrap">
              <img src={product.image} alt={product.name} />
              <span className="pr-category">{product.category}</span>
            </div>

            <div className="pr-card-body">
              <div className="pr-name">{product.name}</div>

              <div className="pr-meta-row">
                <div className="pr-price">${product.price.toLocaleString()}</div>
                <div className={`pr-stock ${product.stock <= 10 ? "low" : ""}`}>
                  <Package size={13} />
                  {product.stock} in stock
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="pr-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pr-modal-header">
              <div className="pr-modal-title">Add New Product</div>
              <button className="pr-modal-close" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="pr-modal-form" onSubmit={handleAddSubmit}>
              <label className="pr-field">
                <span>Product Name</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  placeholder="e.g. iPhone 16 Pro"
                  required
                />
              </label>

              <label className="pr-field">
                <span>Image URL</span>
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) => handleFormChange("image", e.target.value)}
                  placeholder="https://..."
                />
              </label>

              <div className="pr-field-row">
                <label className="pr-field">
                  <span>Price ($)</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => handleFormChange("price", e.target.value)}
                    placeholder="0"
                    min="0"
                    required
                  />
                </label>

                <label className="pr-field">
                  <span>Stock</span>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) => handleFormChange("stock", e.target.value)}
                    placeholder="0"
                    min="0"
                  />
                </label>
              </div>

              <label className="pr-field">
                <span>Category</span>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                  placeholder="e.g. Audio"
                />
              </label>

              <div className="pr-modal-actions">
                <button
                  type="button"
                  className="pr-modal-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="pr-modal-submit">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}