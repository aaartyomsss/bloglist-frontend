import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import { useDispatch, useSelector } from 'react-redux'
import { initialState } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import { login } from './reducers/userReducer'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialState())
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(login(user))
        }
    }, [dispatch])

    return (
        <div>
            <Notification/>
            {user === null ?
                <LoginForm /> :
                <Logout />
            }

            {user === null ?
                null :
                <div>
                    <h2>Create new blog</h2>
                    <Toggable buttonLabel='Add new blog' id='addNewBlog'>
                        <BlogForm setBlogs={setBlogs} blogs={blogs} />
                    </Toggable>
                </div>
            }

            <h2>blogs</h2>


            <div id='blogs'>
                <BlogList/>
            </div>
        </div>
    )
}

export default App
