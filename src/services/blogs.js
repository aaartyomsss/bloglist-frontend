import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const putBlog = async updateBlog => {
  const url = `${baseUrl}/${updateBlog.id}`
  const response = await axios.put(url, updateBlog)
  return response.data
}

const deleteBlog = async blogId => {
  const url = `${baseUrl}/${blogId}`

  const config = {
    headers: { Authorization: token }
  }
  try {
    const response = await axios.delete(url, config)
    return response
  } catch (e) {
    return e
  }
}

export default { getAll, postBlog, setToken, putBlog, deleteBlog }