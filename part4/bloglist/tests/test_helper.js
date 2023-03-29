const Blog = require('../models/blog');
const initialBlogs = [
    {
        title: "Haru",
        author: "Mura",
        url: "sth.com",
        likes: 12
    },
    {
        title: "Har",
        author: "Mur",
        url: "sth.com",
        likes: 10
    },
    {
        title: "Ha",
        author: "ur",
        url: "ash.com",
        likes: 2
    }, 
]

const blogsInDb = async() => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const nonExistingId = async () => {
    const blog = new Blog({
        title: "Hax",
        author: "ur",
        url: "ash.com",
        likes: 2
    })

    await blog.save();
    await blog.deleteOne();

    return blog._id.toString();
}

module.exports = {
    initialBlogs,
    blogsInDb,
    nonExistingId
}