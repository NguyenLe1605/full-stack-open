import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const userTokenKey = 'loggedInUser'
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(userTokenKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await loginService.login({username, password})
      window.localStorage.setItem(userTokenKey, JSON.stringify(response))
      blogService.setToken(response.token)
      setUser(response)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error(exception )
    }
  } 

  const handleLogout = () => {
    window.localStorage.removeItem(userTokenKey)
    setUser(null)
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const newBlog = {title, url, author}
    blogService.create(newBlog)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setTitle('')
        setUrl('')
        setAuthor('')
      })
  }

  if (user == null) {
    return (
      <div>
        <h2>log in to the application</h2>
        <LoginForm 
          onSubmit={handleLogin} 
          credentials={{username, password}} 
          setCredentials={{setUsername, setPassword}}
        />
      </div>
    ) 
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>{user.name} logged in to the application</span>
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <BlogForm 
        onSubmit={handleCreateBlog} 
        blog={{title, url, author}}
        setBlog={{setTitle, setUrl, setAuthor}}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App