import React, { useState } from 'react'
import blogService from '../services/blogs'



const Blog = ({ blog, setBlogs, blogs, i }) => {

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
                setBlogs(blogs.filter(blog => blog.id !== blogId))
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
        <div style={blogStyle} className='singleBlog'>
            {i + 1}&nbsp;
            <div className='blogTitle'>{blog.title}</div>
            {blog.author} <button onClick={() => setVisibility(!showFull)} id='showHide'>{buttonText}</button><button onClick={handleLike} id='likeButton'>Like</button>
            <div style={show} className='notDisplayedByDefault'>
                <div>url: {blog.url}</div>
                <div className='numOfLikes'>Likes: {blog.likes}</div>
                <button onClick={handleDelete} id='deleteButton'>Delete blog</button>
            </div>
        </div>
    )
}

export default Blog