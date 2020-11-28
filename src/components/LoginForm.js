import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {

    LoginForm.propTypes = {
        username: PropTypes.string.isRequired,
        setUsername: PropTypes.func.isRequired,
        password: PropTypes.string.isRequired,
        setPassword: PropTypes.func.isRequired,
        handleLogin: PropTypes.func.isRequired
    }

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