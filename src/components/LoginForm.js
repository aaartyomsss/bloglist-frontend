import React from 'react'

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => {
    return (
        <form onSubmit={handleLogin}>
            <div>
                Username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                Password
                <input
                type="text"
                value={password}
                name="Username"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm