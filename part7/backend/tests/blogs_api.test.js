const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app); 
const Blog = require('../models/blog');
const User = require('../models/user')
const helper = require('./test_helper');

let token;
beforeAll(async() => {
    await helper.initUsers();
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);

    const user = helper.initialUsers[0];
    const loginUser = {
        username: user.username,
        password: user.password
    }
    const returnedUser = await api.post("/api/login").send(loginUser)
    token = returnedUser.body.token
})

beforeEach(async() => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
})

describe('Reading operations of the application', () => {
    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    })
    
    test('all blogs are returned', async() => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    })

    test('The unique identifier property is named id', async () => {
        const response = await api.get('/api/blogs');
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined();
        })
    })
})

describe('Creating operations of the application', () => {
    test('A blog is posted succesfully', async() => {
        const newBlog = {
            title: 'ruha',
            author: 'rurur',
            url: 'rururur.com',
            likes: 100   
        };
        await api 
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
        const blogContents = blogsAtEnd.map(blog => {
            return {
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes
            }
        })
        expect(blogContents).toContainEqual(newBlog);    
    })

    test('A blog without likes has 0 likes', async() => {
        const zeroLikeBlog = {
            title: "zero",
            author: "zero",
            url: "zero.com"
        };
        const zeroBlog  = await api
            .post('/api/blogs')
            .send(zeroLikeBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201);
        expect(zeroBlog.body).toHaveProperty('likes', 0)
        for (const [key, value] of Object.entries(zeroLikeBlog)) {
            expect(zeroBlog.body).toHaveProperty(key, value);
        }
    })

    test('A blog with missing title', async() => {
        const missingTitleBlog = {
            author: "zero",
            url: "zero.com"
        };
        const  blog  = await api
            .post('/api/blogs')
            .send(missingTitleBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    })

    test('A blog with missing url', async() => {
        const missingUrlBlog = {
            title: "blah", 
            author: "zero",
        };
        const  blog  = await api
            .post('/api/blogs')
            .send(missingUrlBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    })

    test('A blog with missing url and title', async() => {
        const missingTitleAndUrlBlog = {
            author: "zero",
        };
        const  blog  = await api
            .post('/api/blogs')
            .send(missingTitleAndUrlBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    })

    test('Unauthorized without proper token', async() => {
        const newBlog = {
            title: 'ruha',
            author: 'rurur',
            url: 'rururur.com',
            likes: 100   
        };
        await api 
            .post('/api/blogs')
            .send(newBlog)
            .expect(401);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    })
})

describe('Deleting Operation of the application', () => {
    test('Deleting an existing blog', async() => {
        const blogs = await helper.blogsInDb();
        const blogToDelete = blogs[0];
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
        expect(blogsAtEnd).not.toContainEqual(blogToDelete);
    })

    test('Deleting a blog with malformated id', async() => {
        const id = 'q23432q';
        const blogsAtStart = await helper.blogsInDb();
        await api
            .delete(`/api/blogs/${id}`)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    })

    test('Deleting a blog with a nonexisting id', async() => {
        const id = await helper.nonExistingId();
        const blogsAtStart = await helper.blogsInDb();
        await api
            .delete(`/api/blogs/${id}`)
            .expect(204)
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    })
})

describe('Updating Operation of the application', () => {
    test('Updating an existing blog', async() => {
        const blogs = await helper.blogsInDb();
        const blogToUpdate = blogs[0];
        const blog = {
            title: blogToUpdate.title,
            url: blogToUpdate.url,
            author: blogToUpdate.author,
            likes: blogToUpdate.likes + 1
        };

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blog)
            .expect(200);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
        const contents = blogsAtEnd.map(blog => {
            return {
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes
            }
        });
        expect(contents).toContainEqual(blog);
    })

    test('Updating a blog with malformated id', async() => {
        const id = 'q23432q';
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];
        const blog = {
            title: blogToUpdate.title,
            url: blogToUpdate.url,
            author: blogToUpdate.author,
            likes: blogToUpdate.likes + 1
        };

        await api
            .put(`/api/blogs/${id}`)
            .send(blog)
            .expect(400);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    })

    test('Updating a blog with a nonexisting id', async() => {
        const id = await helper.nonExistingId();
        const blogsAtStart = await helper.blogsInDb();
        const blogToUpdate = blogsAtStart[0];
        const blog = {
            title: blogToUpdate.title,
            url: blogToUpdate.url,
            author: blogToUpdate.author,
            likes: blogToUpdate.likes + 1
        };

        await api
            .put(`/api/blogs/${id}`)
            .send(blog)
            .expect(400);
        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    })
})

afterAll(async() => {
    await mongoose.connection.close();
})