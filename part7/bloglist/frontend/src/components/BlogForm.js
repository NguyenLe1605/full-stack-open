import Input from "./Input";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <Form className="blog-form" onSubmit={handleCreateBlog}>
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
      <Button className="my-3" id="blog-btn" type="submit">
        create
      </Button>
    </Form>
  );
};

export default BlogForm;
