import Blog from "./Blog";
import { useSelector, useDispatch } from "react-redux";
import { updateBlog } from "../reducers/blogsReducer";

const Blogs = () => {
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

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={handleLikeClick}
          handleRemoveClick={() => {}}
          isCurrentUser={true}
        />
      ))}
    </div>
  );
};

export default Blogs;
