import { useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { updateNotifcation } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import Blogs from "./components/Blogs";
import { initializeBlogs, createBlog } from "./reducers/blogsReducer";
import { loadUser, logoutUser } from "./reducers/userReducer";
import Login from "./pages/Login";

const App = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const addBlog = async (newBlog) => {
    const blog = await dispatch(createBlog(newBlog));
    blogFormRef.current.toggleVisibility();
    const message = `a new blog ${blog.title} by ${blog.author} added`;
    dispatch(updateNotifcation(message, false));
  };

  if (user === null || user === undefined) {
    return <Login />;
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
      <Blogs user={user} />
    </div>
  );
};

export default App;
