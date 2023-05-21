import { useState } from "react";
import { Link } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";

const Blog = ({ blog, handleLikeClick, handleRemoveClick, isCurrentUser }) => {
  const [visible, setVisibility] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };

  const buttonStyle = {
    marginLeft: 5,
  };

  return (
    <ListGroupItem className="blog mb-2">
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
    </ListGroupItem>
  );
};

export default Blog;
