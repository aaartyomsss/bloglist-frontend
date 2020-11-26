import React from 'react'

const Logout = ({username, setUser}) => {

    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
      }

    return (
        <div>
            {username} logged in 
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout