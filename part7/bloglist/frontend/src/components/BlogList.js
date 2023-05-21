import Blog from "./Blog";
import { useSelector, useDispatch } from "react-redux";
import { handleLikeClick, handleRemoveClick } from "../utils/click";
import ListGroup from "react-bootstrap/ListGroup";

const BlogList = ({ user }) => {
  const blogs = useSelector((state) =>
    state.blogs.toSorted((a, b) => b.likes - a.likes)
  );
  const dispatch = useDispatch();

  return (
    <ListGroup>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={handleLikeClick(blogs, dispatch)}
          handleRemoveClick={handleRemoveClick(blogs, dispatch)}
          isCurrentUser={user.username === blog.user.username}
        />
      ))}
    </ListGroup>
  );
};

export default BlogList;
