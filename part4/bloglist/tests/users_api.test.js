const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');

const api = supertest(app); 

const User = require('../models/user');
const helper = require('./test_helper');

beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.initialUsers);
})

afterAll(async () => {
    await mongoose.connection.close();
})

describe("adding a user", () => {
    test("Adding a normal user normally", async () => {
        const user = {
            username: "blah",
            name: "Blahahsta balabaca",
            password: "blah",
        };

        await api
            .post("/api/users")
            .send(user)
            .expect(201);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1);
        const users = usersAtEnd.map(user => {
            return {
                username: user.username,
                name: user.name,
            }
        });
        expect(users).toContainEqual({
            username: user.username,
            name: user.name
        })
    })

    test("Adding a user with a username that has less than 3 characters should not work", async () => {
        const user = {
            username: "bl",
            name: "Blahahsta balabaca",
            password: "blah",
        };

        await api
            .post("/api/users")
            .send(user)
            .expect(400);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
        const users = usersAtEnd.map(user => {
            return {
                username: user.username,
                name: user.name,
            }
        });
        expect(users).not.toContainEqual({
            username: user.username,
            name: user.name
        })
    })

    test("Adding a user with a password that has less than 3 characters should not work", async () => {
        const user = {
            username: "blas",
            name: "Blahahsta balabaca",
            password: "bl",
        };

        await api
            .post("/api/users")
            .send(user)
            .expect(400);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
        const users = usersAtEnd.map(user => {
            return {
                username: user.username,
                name: user.name,
            }
        });
        expect(users).not.toContainEqual({
            username: user.username,
            name: user.name
        })
    })

    test("Adding a user with no username", async () => {
        const user = {
            name: "Blahahsta balabaca",
            password: "bl",
        };

        await api
            .post("/api/users")
            .send(user)
            .expect(400);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
        const users = usersAtEnd.map(user => {
            return {
                username: user.username,
                name: user.name,
            }
        });
        expect(users).not.toContainEqual({
            username: user.username,
            name: user.name
        })
    })

    test("Adding a user without a password", async () => {
        const user = {
            username: "afjeo",
            name: "Blahahsta balabaca",
        };

        await api
            .post("/api/users")
            .send(user)
            .expect(400);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(helper.initialUsers.length);
        const users = usersAtEnd.map(user => {
            return {
                username: user.username,
                name: user.name,
            }
        });
        expect(users).not.toContainEqual({
            username: user.username,
            name: user.name
        })
    })
})
