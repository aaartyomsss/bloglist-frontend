import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'



const Blog = ({ blog }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [showFull, setVisibility] = useState(false)
    const show = { display: showFull ? '' : 'none' }
    const buttonText = showFull ? 'Hide' : 'Show'

    const handleLike = async () => {
        const likedBlog = {
            ...blog,
            likes: blog.likes + 1
        }
        dispatch(likeBlog(likedBlog))
    }

    const handleDelete = async () => {
        const blogId = blog.id
        const token = user.token
        console.log(token, blogId)

        let check = window.confirm('Are you sure that you want to delete this blog?')
        if (check) {
            const response = await blogService.deleteBlog(blogId, token)
            console.log(response)
            if (response.status === 204) {
                dispatch(deleteBlog(blogId))
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