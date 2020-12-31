import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('Check functionality', username, password)

        try {
            const user = await loginService.login({
                username, password
            })

            // Saving login to the browser
            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            )

            const loginString = `${user.username} has loged in!`
            dispatch(setNotification(loginString, true, 1500))
            dispatch(login(user))
            setUsername('')
            setPassword('')
        } catch (e) {
            dispatch(setNotification('Wrong username or password', false, 1500))
            console.log(e.message)
        }
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
                    type="password"
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