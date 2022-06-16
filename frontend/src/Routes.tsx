import React, { useEffect, useState } from "react";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { User } from "./recoil_utils/atoms";
import DoctorChat from "./pages/DoctorChat";



export function Routes() {
  const [user, setUser] = useState<{ token: string }>()
  const navigate = useNavigate()


  useEffect(() => {
    let userData = sessionStorage.getItem('user')
    if (userData !== null) setUser({ token: JSON.parse(userData).token })


    if (!user?.token) {
      console.log("🚀 ~ file: Routes.tsx ~ line 40 ~ useEffect ~ token", user)
      navigate("/auth/login/", { replace: true })
    }
  }, [])


  return <RTs>
    <Route path='/' element={<Home />}>
      <Route path='' element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path='health' element={<HealthTips />} />
        <Route path='reminders' element={<Reminders />} />
        <Route path='medication' element={<Medication />} />
        <Route path='medication/:medId' element={<MedicationDetails />} />
        <Route path='doctors' element={<Doctors />} />
        <Route path='doctor/:id' element={<DoctorChat />} />
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