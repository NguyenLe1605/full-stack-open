const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
})
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save();
    response.status(201).json(result);
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body;
    const blogContent = {
      title: body.title,
      url: body.url,
      author: body.author,
      likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogContent, {new: true});
    if (updatedBlog == null) {
      return response.status(400).end();
    }
    response.status(200).json(updatedBlog);
})


module.exports = blogRouter;