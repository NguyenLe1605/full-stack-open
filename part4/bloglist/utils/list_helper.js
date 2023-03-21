const _ = require('lodash');
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>  {
    if (blogs == null) return 0;
    return blogs.reduce((acc, curr) => acc + curr.likes, 0); 
}

const favoriteBlog = (blogs) => {
    if (blogs == null || blogs.length === 0) return null;
    const {title, author, likes} = blogs.reduce((acc, curr) => acc.likes > curr.likes ? acc : curr);
    return {title, author, likes};
}

const mostBlogs = (blogs) => {
    if (blogs == null || blogs.length === 0) {
        return null;
    }

    const groupedBlogs = _.countBy(blogs, 'author')
    const res = Object
        .keys(groupedBlogs)
        .map((key) => {
            return {
                author: key,
                blogs: groupedBlogs[key],
            }
        });
    return res.reduce((acc, curr) => acc.blogs > curr.blogs ? acc : curr);    
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}