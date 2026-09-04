import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import DashboardLayout from './components/layout/Layout'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Notfound from './pages/notfound/Notfound'
import Saved from './pages/saved/Saved'

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/list' element={<List />} />
        <Route path='/saved' element={<Saved />} />
      </Route>
        <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default App