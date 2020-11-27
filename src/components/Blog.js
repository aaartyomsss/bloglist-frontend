import React, { useState } from 'react'


const Blog = ({ blog }) => {

  const [showFull, setVisibility] = useState(false)
  const show = {display: showFull ? '' : 'none'}
  const buttonText = showFull ? 'Hide' : 'Show'


  const blogStyle = {
    border: '1px solid black',
    padding: '10px',
    margin: '5px',
    borderRadius: '10px'
  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={() => setVisibility(!showFull)}>{buttonText}</button>
    <div style={show}>
    url: {blog.url}<br/>
    Likes: {blog.likes}
    </div>
  </div>
  )
}

export default Blog