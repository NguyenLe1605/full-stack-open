import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef(null);

  const [notif, setNotif] = useState({
    message: "",
    color: "green"
  });

  useEffect(() => {
    const user = storageService.loadUser();
    setUser(user);
  }, []);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);


  const updateNotifcation = (message, color) => {
    setNotif({
      message: message,
      color: color
    });
    setTimeout(() => {
      setNotif({
        message: "",
        color: "green"
      });
    }, 5000);
  };

  const login = async (username, password) => {
    try {
      const response = await loginService.login({ username, password });
      storageService.saveUser(response);
      setUser(response);
    } catch(exception) {
      updateNotifcation("wrong username or password", "red");
    }
  };

  const handleLogout = () => {
    storageService.removeUser();
    setUser(null);
  };

  const addBlog = (newBlog) => {
    blogService.create(newBlog)
      .then(blog => {
        blogFormRef.current.toggleVisibility();
        setBlogs(blogs.concat(blog));
        const message = `a new blog You're NOT gonna need it! by ${user.name} added`;
        updateNotifcation(message, "green");
      });
  };

  const handleLikeClick = (event) => {
    const id = event.target.dataset.id;
    const newBlog = { ...blogs.find(blog => blog.id === id) };
    newBlog.likes += 1;
    blogService.update(id, newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog));
      });
  };

  const handleRemoveClick = (event) => {
    const id = event.target.dataset.id;
    const deletedBlog = blogs.find(blog => blog.id === id);
    if (window.confirm(`Remove ${deletedBlog.title} by ${deletedBlog.author}`)) {
      blogService.remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id));
        });
    }
  };

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);


  if (user === null || user === undefined) {
    return (
      <div>
        <h2>log in to the application</h2>
        <Notification message={notif.message} color={notif.color} />
        <LoginForm
          onLogin={login}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notif.message} color={notif.color} />
      <span>{user.name} logged in to the application</span>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={handleLikeClick}
          handleRemoveClick={handleRemoveClick}
          isCurrentUser={blog.user.username === user.username}
        />
      )}
    </div>
  );
};

export default App;