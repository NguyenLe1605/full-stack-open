import Blog from "./Blog";
import { useSelector } from "react-redux";

const Blogs = () => {
  const blogs = useSelector((state) =>
    state.blogs.toSorted((a, b) => b.likes - a.likes)
  );

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={() => {}}
          handleRemoveClick={() => {}}
          isCurrentUser={true}
        />
      ))}
    </div>
  );
};

export default Blogs;
