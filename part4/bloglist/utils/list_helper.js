const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) =>  {
    if (blogs == null) return 0;
    return blogs.reduce((acc, curr) => acc + curr.likes, 0); 
}

module.exports = {
    dummy,
    totalLikes
}