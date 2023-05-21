import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialState = [];

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    modifyBlog(state, action) {
      const { id, blog: updatedBlog } = action.payload;
      return state.map((blog) => (blog.id === id ? updatedBlog : blog));
    },
    removeBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, modifyBlog, removeBlog } =
  blogsSlice.actions;
export default blogsSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.create(newBlog);
    await dispatch(appendBlog(blog));
    return blog;
  };
};

export const updateBlog = (id, updatedBlog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(id, updatedBlog);
    dispatch(modifyBlog({ id, blog: returnedBlog }));
    return returnedBlog;
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export const postComment = (id, comment) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.comment(id, comment);
    dispatch(modifyBlog({ id, blog: returnedBlog }));
  };
};
