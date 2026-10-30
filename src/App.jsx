import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/layout/Layout'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Notfound from './pages/notfound/Notfound'
import Saved from './pages/saved/Saved'
import Order from './pages/order/Order'
import OrderList from './pages/orderlist/OrderList'
import Products from './pages/products/Products'
import SecretGate from './components/secret/SecretGate'

function App() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const flag = localStorage.getItem('adminUnlocked');
    if (token && flag === 'true') {
      setUnlocked(true);
    }
  }, []);

  if (!unlocked) {
    return <SecretGate onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/list' element={<List />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/orderlist' element={<OrderList />} />
        <Route path='/product' element={<Products />} />
      </Route>
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default App
