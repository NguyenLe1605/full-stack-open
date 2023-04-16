import { useState } from "react";

const Blog = ({
  blog,
  handleLikeClick,
  handleRemoveClick, isCurrentUser
}) => {

  const [visible, setVisibility] = useState(false);
  const showWhenVisible = { display: visible ? "" : "none" };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => {setVisibility(!visible);}}>{!visible ? "view" : "hide"}</button>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button data-id={blog.id}  onClick={handleLikeClick}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {isCurrentUser && <button data-id={blog.id} onClick={handleRemoveClick}>remove</button>}
      </div>
    </div>
  );
};

export default Blog;