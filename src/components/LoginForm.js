import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {

    LoginForm.propTypes = {
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }

    return (
        <form onSubmit={handleLogin} id='loginForm'>
            <div>
                Username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    id='username'
                />
            </div>
            <div>
                Password
                <input
                    type="text"
                    value={password}
                    name="Username"
                    onChange={({ target }) => setPassword(target.value)}
                    id='password'
                />
            </div>
            <button type="submit" id='login-button'>Login</button>
        </form>
    )
}

export default LoginForm