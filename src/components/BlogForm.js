import React, { useState } from 'react'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'


const BlogFrom = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)


    // Posting new blog
    const handlePosting = async (event) => {
        event.preventDefault()
        try {
            const newBlog = {
                title: title,
                author: author,
                url: url
            }
            const token = user.token
            const posted = await blogService.postBlog(newBlog, token)
            dispatch(setNotification('New blog was added', true, 1500))
            dispatch(addBlog(posted))
            setAuthor('')
            setTitle('')
            setUrl('')
        } catch (e) {
            console.log(e.message)
        }
    }


    return (
        <form onSubmit={handlePosting} className='form'>
            <div>
                Title:
                <input
                    id='title'
                    type="text"
                    value={title}
                    name="Username"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    id='author'
                    type="text"
                    value={author}
                    name="Username"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                Url:
                <input
                    id='url'
                    type="text"
                    value={url}
                    name="Username"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit" id='addBlog'>Create</button>
        </form>
    )
}

export default BlogFrom