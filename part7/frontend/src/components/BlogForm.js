import Input from "./Input";
import { useState } from "react";
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleCreateBlog = (event) => {
    event.preventDefault();
    const newBlog = { title, url, author };
    createBlog(newBlog);
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <form className="blog-form" onSubmit={handleCreateBlog}>
      <Input
        id="title"
        type="text"
        value={title}
        name="title"
        handleChange={({ target }) => setTitle(target.value)}
      />

      <Input
        id="author"
        type="text"
        value={author}
        name="author"
        handleChange={({ target }) => setAuthor(target.value)}
      />

      <Input
        id="url"
        type="text"
        value={url}
        name="url"
        handleChange={({ target }) => setUrl(target.value)}
      />
      <button id="blog-btn" type="submit">create</button>
    </form>
  );
};

export default BlogForm;