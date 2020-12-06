import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import ErrorMessage from './components/ErrorMessage'
import SuccessMessage from './components/SuccessMessage'
import Toggable from './components/Toggable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setError] = useState(null)
    const [errorText, setErrorText] = useState('')
    const [showPos, setPos] = useState(null)
    const [posText, setPosText] = useState('')



    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((b1, b2) => b2.likes - b1.likes))
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)

        }
    }, [])

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

            blogService.setToken(user.token)

            const loginString = `${user.username} has loged in!`
            setPosText(loginString)
            setPos(true)
            setTimeout(() => {
                setPos(null)
                setPosText('')
            }, 3000)

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (e) {
            setError(true)
            setErrorText('Wrong username or password')
            setTimeout(() => {
                setError(null)
                setErrorText('')
            }, 3000)
            console.log(e.message)
        }

    }



    return (
        <div>
            {showError === true ? <ErrorMessage text={errorText} /> : null}
            {showPos === true ? <SuccessMessage text={posText} /> : null}
            {user === null ?
                <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/> :
                <Logout username={user.username} setUser={setUser} />
            }

            {user === null ?
                null :
                <div>
                    <h2>Create new blog</h2>
                    <Toggable buttonLabel='Add new blog' id='addNewBlog'>
                        <BlogForm setBlogs={setBlogs} blogs={blogs} setPos={setPos} setPosText={setPosText} />
                    </Toggable>
                </div>
            }

            <h2>blogs</h2>


            <div id='blogs'>
            {blogs.map((blog, i) =>

                <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} i={i}/>
            )}
            </div>
        </div>
    )
}

export default App
