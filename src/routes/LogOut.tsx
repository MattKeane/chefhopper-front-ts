import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOutUser } from '../features/user/userSlice'

export default function LogOut() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(logOutUser())
        navigate('/')
    })

    return <></>
}