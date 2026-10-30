import React, { useState } from 'react';
import { adminAPI } from '../../api/client';
import './SecretGate.css';

export default function SecretGate({ onUnlock }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminAPI.login(password);
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminUnlocked', 'true');
      onUnlock();
    } catch (err) {
      setError(err.message || 'Incorrect secret password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="secret-gate">
      <form className="secret-form" onSubmit={handleSubmit}>
        <h1>Enter Secret Password</h1>
        <p>Admin Dashboard Access</p>
        {error && <div className="secret-error">{error}</div>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Secret password"
          autoFocus
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Verifying...' : 'Enter'}
        </button>
      </form>
    </div>
  );
}
