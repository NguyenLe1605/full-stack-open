const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app); 

const Blog = require('../models/blog');
const helper = require('./test_helper');
const { application } = require('express');

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
            .expect(400);
    })

    test('A blog with missing url and title', async() => {
        const missingTitleAndUrlBlog = {
            author: "zero",
        };
        const  blog  = await api
            .post('/api/blogs')
            .send(missingTitleAndUrlBlog)
            .expect(400);
    })
})

afterAll(async() => {
    await mongoose.connection.close();
})