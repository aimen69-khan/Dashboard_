import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/layout/Layout'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Notfound from './pages/notfound/Notfound'
import Saved from './pages/saved/Saved'
import Order from './pages/order/Order'
import OrderList from './pages/orderlist/OrderList'

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/list' element={<List />} />
        <Route path='/saved' element={<Saved />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/orderlist' element={<OrderList />} />
      </Route>
        <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default App