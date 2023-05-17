const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { blogs: 0 });
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const requestedUser = request.user;
  const user = await User.findById(requestedUser.id);
  const blog = new Blog({ ...body, user: user._id });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  const res = await result.populate("user", { blogs: 0 });
  response.status(201).json(res);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const userid = request.user.id;
    const blog = await Blog.findById(request.params.id);
    if (blog.user.toString() !== userid.toString()) {
      return response.status(401).json({ error: "invalid user" });
    }
    await Blog.findByIdAndRemove(request.params.id);
    const user = await User.findById(userid);
    user.blogs = user.blogs.filter(
      (blogid) => blogid.toString() !== blog._id.toString()
    );
    await user.save();
    response.status(204).end();
  }
);

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blogContent = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blogContent,
    { new: true }
  );
  if (updatedBlog == null) {
    return response.status(400).end();
  }
  const returnedBlog = await updatedBlog.populate("user", { blogs: 0 });
  response.status(200).json(returnedBlog);
});

module.exports = blogRouter;
