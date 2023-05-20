import { updateBlog, deleteBlog } from "../reducers/blogsReducer";

export const handleLikeClick = (blogs, dispatch) => {
  return (event) => {
    const id = event.target.dataset.id;
    const newBlog = { ...blogs.find((blog) => blog.id === id) };
    newBlog.likes += 1;
    dispatch(updateBlog(id, newBlog));
  };
};

export const handleRemoveClick = (blogs, dispatch) => {
  return (event) => {
    const id = event.target.dataset.id;
    const deletedBlog = blogs.find((blog) => blog.id === id);
    if (
      window.confirm(`Remove ${deletedBlog.title} by ${deletedBlog.author}`)
    ) {
      dispatch(deleteBlog(id));
    }
  };
};
