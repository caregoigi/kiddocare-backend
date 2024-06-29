import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './scss/style.scss'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import useAuthStore from './hooks/useAuthStore'
import DefaultLayout from './layout/DefaultLayout'
import Login from './views/login/Login'

const App = () => {
  const { token } = useAuthStore()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/*" element={token ? <DefaultLayout /> : <Navigate to="/admin" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


