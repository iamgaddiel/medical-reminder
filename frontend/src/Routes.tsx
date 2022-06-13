import React from "react";
import Doctors from './pages/Doctors'
import MedicationDetails from './pages/MedicationDetails'
import { Route, Routes as RTs, useNavigate } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login'
import Page404 from './pages/Page404'
import Signup from './pages/Signup'

import './assets/css/base.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Layout from './components/Layout'
import HealthTips from './pages/HealthTips'
import Home from './pages/Home'
import Reminders from './pages/Reminders'
import Medication from './pages/Medication'
import { useRecoilValue } from "recoil";
import { User } from "./recoil_utils/atoms";



export function Routes() {
  const user = useRecoilValue(User)
  const navigate = useNavigate()

  if (user.token === "") {
    navigate("/auth/login/", { replace: true })
  }

  return <RTs>
    <Route path='/' element={<Home />}>
      <Route path='' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='health' element={<HealthTips />} />
        <Route path='reminders' element={<Reminders />} />
        <Route path='medication' element={<Medication />} />
        <Route path='medication/:medId' element={<MedicationDetails />} />
        <Route path='doctors' element={<Doctors />} />
      </Route>
      <Route path='auth' element={<AuthLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Route>
      <Route path='*' element={<Page404 />} />
    </Route>
  </RTs>
}

export default Routes