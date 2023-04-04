const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {blogs: 0});
  response.json(blogs);
})
  
blogRouter.post('/', async (request, response) => {
    const body = request.body;
    const user = await User.findOne();
    const blog = new Blog({...body, user: user._id});
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
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