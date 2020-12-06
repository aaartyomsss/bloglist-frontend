import React from 'react'

const Logout = ({ username, setUser }) => {

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }

    return (
        <div>
            {username} logged in
            <button onClick={handleLogout} id='logoutButton'>Logout</button>
        </div>
    )
}

export default Logout