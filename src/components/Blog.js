import React, { useState } from 'react'
import blogService from '../services/blogs'



const Blog = ({ blog, setBlogs, blogs }) => {

    const [showFull, setVisibility] = useState(false)
    const show = { display: showFull ? '' : 'none' }
    const buttonText = showFull ? 'Hide' : 'Show'

    const handleLike = async () => {
        const newBlog = {
            ...blog
        }
        newBlog.likes = newBlog.likes + 1

        const response = await blogService.putBlog(newBlog)
        setBlogs(blogs.map(blog => blog.id !== newBlog.id ? blog : response).sort((b1, b2) => b2.likes - b1.likes))
    }

    const handleDelete = async () => {
        const blogId = blog.id

        let check = window.confirm('Are you sure that you want to delete this blog?')
        if (check) {
            const response = await blogService.deleteBlog(blogId)
            if (response.status === 204) {
                return response
            } else {
                alert('You cannot delete this post')
            }
        }
    }

    const blogStyle = {
        border: '1px solid black',
        padding: '10px',
        margin: '5px',
        borderRadius: '10px'
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author} <button onClick={() => setVisibility(!showFull)}>{buttonText}</button><button onClick={handleLike}>Like</button>
            <div style={show} className='notDisplayedByDefault'>
    url: {blog.url}<br/>
    Likes: {blog.likes}<br/>
                <button onClick={handleDelete}>Delete blog</button>
            </div>
        </div>
    )
}

export default Blog