const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

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

const initUsers = async() => {
    for (let user of initialUsers) {
        const saltRounds = 10
        user.passwordHash = await bcrypt.hash(user.password, saltRounds)
    }
}

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

const getToken = async () => {
    const users = await usersInDb();
    const user = users[0]
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    return token
}

module.exports = {
    initialBlogs,
    initialUsers,
    usersInDb,
    blogsInDb,
    nonExistingId,
    initUsers
}