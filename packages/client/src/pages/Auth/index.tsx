import React from 'react'

import { Route, Routes, Navigate } from 'react-router-dom'

import Login from './Login'
import Register from './Register'

const Auth = () => (
  <Routes>
    <Route path="/auth" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/" element={<Navigate replace to="/auth" />} />
  </Routes>
)

export default Auth
