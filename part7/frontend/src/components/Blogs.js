import Blog from "./Blog";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/blogsReducer";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) =>
    state.blogs.toSorted((a, b) => b.likes - a.likes)
  );
  const dispatch = useDispatch();
  const handleLikeClick = (event) => {
    const id = event.target.dataset.id;
    const newBlog = { ...blogs.find((blog) => blog.id === id) };
    newBlog.likes += 1;
    dispatch(updateBlog(id, newBlog));
  };

  const handleRemoveClick = (event) => {
    const id = event.target.dataset.id;
    const deletedBlog = blogs.find((blog) => blog.id === id);
    if (
      window.confirm(`Remove ${deletedBlog.title} by ${deletedBlog.author}`)
    ) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={handleLikeClick}
          handleRemoveClick={handleRemoveClick}
          isCurrentUser={user.username === blog.user.username}
        />
      ))}
    </div>
  );
};

export default Blogs;
