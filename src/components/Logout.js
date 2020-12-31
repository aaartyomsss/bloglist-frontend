import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Logout = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(logout())
    }

    return (
        <div>
            {user.username} logged in
            <button onClick={handleLogout} id='logoutButton'>Logout</button>
        </div>
    )
}

export default Logout