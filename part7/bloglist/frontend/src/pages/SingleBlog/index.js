import { useParams } from "react-router-dom";
import BlogDetails from "../../components/BlogDetails";
import { handleLikeClick, handleRemoveClick } from "../../utils/click";
import { useDispatch, useSelector } from "react-redux";

const SingleBlog = ({ blogs }) => {
  if (!blogs) {
    return null;
  }
  const id = useParams().id;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blog = blogs.find((blog) => blog.id === id);
  return (
    <div>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <BlogDetails
        blog={blog}
        handleLikeClick={handleLikeClick(blog, dispatch)}
        handleRemoveClick={handleRemoveClick(blog, dispatch)}
        isCurrentUser={blog.user.username === user.username}
      />
    </div>
  );
};
export default SingleBlog;
