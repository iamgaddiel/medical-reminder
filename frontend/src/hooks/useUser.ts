import { useEffect, useState } from 'react'
import {useRecoilState, useRecoilValue} from 'recoil'
import { User } from '../recoil_utils/atoms'


const useUser = () => {
    const [user, setUser] = useRecoilState(User)
    useEffect(
        () => {
            const res = localStorage.getItem('user')
            // setUser(JSON.parse(res))
        }
    , [])
    
    return [user, setUser]
}

export default useUser