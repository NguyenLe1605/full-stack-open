import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notif, setNotif] = useState({
    message: '',
    color: 'green'
  })
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

  const updateNotifcation = (message, color) => {
    setNotif({
      message: message,
      color: color
    })
    setTimeout(() => {
      setNotif({
        message: '',
        color: 'green'
      })
    }, 5000)
  }

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
      updateNotifcation('wrong username or password', 'red')
    }
  } 

  const handleLogout = () => {
    window.localStorage.removeItem(userTokenKey)
    setUser(null)
  }

  const addBlog = (newBlog) => {
    blogService.create(newBlog)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        const message = `a new blog You're NOT gonna need it! by ${user.name} added`
        updateNotifcation(message, 'green')
      })
  }


  if (user == null) {
    return (
      <div>
        <h2>log in to the application</h2>
        <Notification message={notif.message} color={notif.color} />
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
      <Notification message={notif.message} color={notif.color} />
      <span>{user.name} logged in to the application</span>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new note">
        <h2>create new</h2>
        <BlogForm 
          createBlog={addBlog}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App