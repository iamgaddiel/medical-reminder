import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <section className="auth-wrapper">
    <section className="auth-wrapper-content">
      <Outlet />
    </section>
  </section>
  )
}

export default AuthLayout