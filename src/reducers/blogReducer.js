import blogServices from '../services/blogs'


const blogReducer = (state = [], action) => {
    switch (action.type) {
    case 'INIT':
        return action.blogs
    case 'LIKE':
        return state.map(blog => blog.id === action.likedBlog.id ? action.likedBlog : blog)
    case 'REMOVE':
        return [...state].filter(blog => blog.id !== action.id)
    case 'ADD':
        console.log(action.blog)
        const blogs = [...state].concat(action.blog)
        return blogs
    default:
        return state
    }
}

export const likeBlog = (likedBlog) => {
    return async dispatch => {
        // eslint-disable-next-line
        const response = await blogServices.putBlog(likedBlog)
        dispatch({
            type: 'LIKE',
            likedBlog
        })
    }
}


export const initialState = () => {
    return async dispatch => {
        const blogs = await blogServices.getAll()
        dispatch({
            type: 'INIT',
            blogs
        })
    }
}

export const deleteBlog = (id) => {
    return {
        type: 'REMOVE',
        id
    }
}

export const addBlog = (blog) => {
    return {
        type: 'ADD',
        blog
    }
}

export default blogReducer