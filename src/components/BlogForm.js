import React, { useState } from 'react'
import blogService from '../services/blogs'


const BlogFrom = ({ blogs, setBlogs, setPos, setPosText }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    // Posting new blog
    const handlePosting = async (event) => {
        event.preventDefault()
        const newBlog = {
            title: title,
            author: author,
            url: url
        }
        const response = await blogService.postBlog(newBlog)
        setPosText('New blog has been successfully added!')
        setPos(true)
        setTimeout(() => {
            setPos(null)
            setPosText('')
        }, 3000)
        setBlogs(blogs.concat(response))
        setAuthor('')
        setTitle('')
        setUrl('')
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
            <button type="submit">Create</button>
        </form>
    )
}

export default BlogFrom