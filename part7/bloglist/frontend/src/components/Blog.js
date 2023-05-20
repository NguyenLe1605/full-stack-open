import { useState } from "react";
import { Link } from "react-router-dom";
import BlogDetails from "./BlogDetails";

const Blog = ({ blog, handleLikeClick, handleRemoveClick, isCurrentUser }) => {
  const [visible, setVisibility] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonStyle = {
    marginLeft: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <Link to={`blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      <button
        style={buttonStyle}
        className="viewButton"
        onClick={() => {
          setVisibility(!visible);
        }}
      >
        {!visible ? "view" : "hide"}
      </button>
      <BlogDetails
        style={showWhenVisible}
        blog={blog}
        handleLikeClick={handleLikeClick}
        handleRemoveClick={handleRemoveClick}
        isCurrentUser={isCurrentUser}
      />
    </div>
  );
};

export default Blog;
