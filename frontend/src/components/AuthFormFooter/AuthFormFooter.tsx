import { Button } from '@material-ui/core'
import { Alert, AlertTitle } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { authenticateUser, createUser } from '../../utils/api_calls'
import { useNavigate } from 'react-router-dom'
import {useRecoilState} from 'recoil'
import { User } from '../../recoil_utils/atoms'


type Props = {
    backLink: string
    buttonLabel: string,
    backText: string,
    data: {
        first_name?: string,
        last_name?: string,
        username: string,
        account_type?: 'doctor' | 'patient' | 'account_type',
        password: string,
        confirm_password?: string,
    }
    submissionType: string
}

const AuthFormFooter = ({ backLink, buttonLabel, backText, data, submissionType }: Props) => {
    const navigate = useNavigate()
    const [_, setUser] = useRecoilState(User)

    const handleSubmit = async () => {
        if (submissionType === 'signup') {
            if (data.password != data.confirm_password) {
                // todo: show an alert
                alert('passwords do not match')
                return
            }
            try{
                const res = await createUser(data)
                navigate("/auth/login/")
            } catch (err){
                alert(err)
            }
        }
        else if (submissionType === 'login') {
            const loginCredentials = {
                username: data.username,
                password: data.password
            }
            try{
                const res = await authenticateUser(loginCredentials)
                if (res.status === 400) {
                    alert('username or password is incorrect')
                    return
                }
                const user = await res.json()
                setUser(user)
                navigate('/')
                sessionStorage.setItem('user', JSON.stringify(user))
                
            } catch (err){
                console.log("🚀 ~ file: AuthFormFooter.tsx ~ line 60 ~ handleSubmit ~ err", err)
            }
            
        }
    }


    return (
        <div className='mt-5 d-flex justify-content-between'>
            <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit}
            >
                {buttonLabel}
            </Button>
            <Link to={backLink} className='ml-4'>{backText}</Link>
        </div>
    )
}

export default AuthFormFooter