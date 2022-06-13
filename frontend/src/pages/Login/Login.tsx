import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useForm, SubmitHandler } from "react-hook-form";
import AuthFormFooter from '../../components/AuthFormFooter';

type Inputs = {
  username: string,
  password: string,
};

const Login = () => {
  // const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  // const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const data = {username, password}
  
  return (
    <section className="auth-form">
      <div className="auth-form-content">
        <h1>Login Form</h1>

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
        <div className='mt-3'>
          <TextField
            id="password"
            label="Password"
            variant='standard'
            className='w-100'
            type='password'
            required
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
        <AuthFormFooter 
        buttonLabel='Login' 
        backLink='/auth/signup' 
        backText='signup' 
        data={data} 
        submissionType="login"
        />

      </div>
    </section>
  )
}

export default Login