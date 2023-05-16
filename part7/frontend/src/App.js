import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { updateNotifcation } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = storageService.loadUser();
    setUser(user);
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginService.login({ username, password });
      storageService.saveUser(response);
      setUser(response);
    } catch (exception) {
      dispatch(updateNotifcation("wrong username or password", true));
    }
  };

  const handleLogout = () => {
    storageService.removeUser();
    setUser(null);
  };

  const addBlog = (newBlog) => {
    blogService.create(newBlog).then((blog) => {
      blogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(blog));
      const message = `a new blog ${newBlog.title} by ${user.name} added`;
      dispatch(updateNotifcation(message, false));
    });
  };

  const handleLikeClick = (event) => {
    const id = event.target.dataset.id;
    const newBlog = { ...blogs.find((blog) => blog.id === id) };
    newBlog.likes += 1;
    blogService.update(id, newBlog).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog))
      );
    });
  };

  const handleRemoveClick = (event) => {
    const id = event.target.dataset.id;
    const deletedBlog = blogs.find((blog) => blog.id === id);
    if (
      window.confirm(`Remove ${deletedBlog.title} by ${deletedBlog.author}`)
    ) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      });
    }
  };

  const sortedBlogs = blogs.toSorted((a, b) => b.likes - a.likes);

  if (user === null || user === undefined) {
    return (
      <div>
        <h2>log in to the application</h2>
        <Notification message />
        <LoginForm onLogin={login} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <span>{user.name} logged in to the application</span>
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={handleLikeClick}
          handleRemoveClick={handleRemoveClick}
          isCurrentUser={blog.user.username === user.username}
        />
      ))}
    </div>
  );
};

export default App;
