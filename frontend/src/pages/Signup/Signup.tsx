import { TextField, Button, MenuItem, Select, FormControl } from '@material-ui/core';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AuthFormFooter from '../../components/AuthFormFooter';



const Signup = () => {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [account_type, setAccountType] = useState<'doctor' | 'patient' | 'account_type'>('account_type')
  const [password, setPassword] = useState('')
  const [confirm_password, setPasswordConfirm] = useState('')
  const handleAccountType = (event: any) => setAccountType(event.target.value as 'doctor' | 'patient');



  type FormData = {
    first_name: string,
    last_name: string,
    username: string,
    account_type: 'doctor' | 'patient' | 'account_type',
    password: string,
    confirm_password: string
  }
  let data: FormData = { first_name, last_name, username, account_type, password, confirm_password }

  return (
    <section className="auth-form">
      <div className="auth-form-content">
        <h1>Signup Form</h1>


        <form>
          <div className='mt-3'>
            <TextField
              id="firstName"
              label="First Name"
              variant='standard'
              className='w-100'
              required
              value={first_name}
              onChange={(e: any) => setFirstName(e.target.value)}
            />
          </div>

          <div className='mt-3'>
            <TextField
              id="lastName"
              label="Last Name"
              variant='standard'
              className='w-100'
              required
              value={last_name}
              onChange={(e: any) => setLastName(e.target.value)}
            />
          </div>

          <div className='mt-3'>
            <TextField
              id="username"
              label="Username"
              variant='standard'
              className='w-100'
              required
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
            />
          </div>

          <FormControl fullWidth className='mt-3'>
            <Select
              label='Account Type'
              placeholder='Account Type'
              value={account_type}
              onChange={handleAccountType}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value='doctor'>Doctor</MenuItem>
              <MenuItem value='patient'>Patients</MenuItem>
            </Select>
          </FormControl>

          {/* password */}
          <div className='mt-3'>
            <TextField
              id="password"
              label="Password"
              variant='standard'
              className='w-100'
              required
              type='password'
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>

          {/* confirm password */}
          <div className='mt-3'>
            <TextField
              id="cofirmPassword"
              label="Confirm Password"
              variant='standard'
              className='w-100'
              required
              type='password'
              value={confirm_password}
              onChange={(e: any) => setPasswordConfirm(e.target.value)}
            />
          </div>

          <AuthFormFooter
            buttonLabel='Signup'
            backLink='/auth/login'
            backText='login'
            data={data}
            submissionType='signup'
          />
        </form>
      </div>
    </section >
  )
}

export default Signup

