const bcrypt = require("bcryptjs");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) {
    return response.status(400).json({
      error: "missing password",
    });
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: "password length must be at least 3 characters",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });
  const returnedUser = await user.save();
  response.status(201).json(returnedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { user: 0, likes: 0 });
  response.status(200).json(users);
});

module.exports = userRouter;
