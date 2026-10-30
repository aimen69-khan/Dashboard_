import API_URL from './config';

const getToken = () => localStorage.getItem('adminToken');

export async function apiRequest(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    err.status = res.status;
    throw err;
  }
  return data;
}

export const adminAPI = {
  login: (password) => apiRequest('/admin/login', { method: 'POST', body: JSON.stringify({ password }) }),
  dashboard: () => apiRequest('/admin/dashboard'),
  products: () => apiRequest('/admin/products'),
  createProduct: (body) => apiRequest('/admin/products', { method: 'POST', body: JSON.stringify(body) }),
  updateProduct: (id, body) => apiRequest(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProduct: (id) => apiRequest(`/admin/products/${id}`, { method: 'DELETE' }),
  orders: (params = {}) => {
    const q = new URLSearchParams(params).toString();
    return apiRequest(`/admin/orders${q ? `?${q}` : ''}`);
  },
  updateOrderStatus: (id, status) => apiRequest(`/admin/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  users: () => apiRequest('/admin/users'),
  toggleUser: (id) => apiRequest(`/admin/users/${id}/toggle`, { method: 'PUT' }),
};
