import { useState, useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import loginService from "./services/login";
import storageService from "./services/storage";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { updateNotifcation } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";
import Blogs from "./components/Blogs";
import { initializeBlogs, createBlog } from "./reducers/blogsReducer";

const App = () => {
  const [user, setUser] = useState(null);
  const blogFormRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = storageService.loadUser();
    setUser(user);
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
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

  const addBlog = async (newBlog) => {
    const blog = await dispatch(createBlog(newBlog));
    blogFormRef.current.toggleVisibility();
    const message = `a new blog ${blog.title} by ${blog.author} added`;
    dispatch(updateNotifcation(message, false));
  };

  // const handleRemoveClick = (event) => {
  //   const id = event.target.dataset.id;
  //   const deletedBlog = blogs.find((blog) => blog.id === id);
  //   if (
  //     window.confirm(`Remove ${deletedBlog.title} by ${deletedBlog.author}`)
  //   ) {
  //     blogService.remove(id).then(() => {
  //       setBlogs(blogs.filter((blog) => blog.id !== id));
  //     });
  //   }
  // };

  if (user === null || user === undefined) {
    return (
      <div>
        <h2>log in to the application</h2>
        <Notification />
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
      <Blogs />
    </div>
  );
};

export default App;
