const Blog = require('../models/blog');
const User = require('../models/user')

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

const initialUsers = [
    {
        username: "Rel",
        name: "Rela Belado",
        password: "123456"
    },
    {
        username: "SOI",
        name: "Solitude Oneness",
        password: "123465"
    },
    {
        username: "Zefai",
        name: "Zefaisto Lacadildo",
        password: "123456",
    }
]

const blogsInDb = async() => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
}

const usersInDb = async() => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
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
    initialUsers,
    usersInDb,
    blogsInDb,
    nonExistingId
}