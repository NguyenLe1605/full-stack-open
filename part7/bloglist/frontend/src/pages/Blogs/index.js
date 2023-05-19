import Togglable from "../../components/Togglable";
import BlogForm from "../../components/BlogForm";
import BlogList from "../../components/BlogList";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { createBlog } from "../../reducers/blogsReducer";
import { updateNotifcation } from "../../reducers/notificationReducer";

const Blogs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef(null);

  const addBlog = async (newBlog) => {
    const blog = await dispatch(createBlog(newBlog));
    blogFormRef.current.toggleVisibility();
    const message = `a new blog ${blog.title} by ${blog.author} added`;
    dispatch(updateNotifcation(message, false));
  };

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <BlogList user={user} />
    </div>
  );
};

export default Blogs;
