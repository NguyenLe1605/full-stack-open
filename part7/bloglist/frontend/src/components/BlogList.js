import Blog from "./Blog";
import { useSelector, useDispatch } from "react-redux";
import { handleLikeClick, handleRemoveClick } from "../utils/click";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) =>
    state.blogs.toSorted((a, b) => b.likes - a.likes)
  );
  const dispatch = useDispatch();

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={handleLikeClick(blogs, dispatch)}
          handleRemoveClick={handleRemoveClick(blogs, dispatch)}
          isCurrentUser={user.username === blog.user.username}
        />
      ))}
    </div>
  );
};

export default BlogList;
