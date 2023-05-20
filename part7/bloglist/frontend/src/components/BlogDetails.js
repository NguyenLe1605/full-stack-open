const BlogDetails = ({
  blog,
  handleLikeClick,
  handleRemoveClick,
  isCurrentUser,
  style,
}) => {
  const buttonStyle = {
    marginLeft: 5,
  };

  return (
    <div style={style} className="blogDetails">
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes
        <button style={buttonStyle} data-id={blog.id} onClick={handleLikeClick}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {isCurrentUser && (
        <button data-id={blog.id} onClick={handleRemoveClick}>
          remove
        </button>
      )}
    </div>
  );
};

export default BlogDetails;
