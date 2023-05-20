import { Routes, Route } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Blogs from "../Blogs";
import Users from "../Users";
import { useEffect, useState } from "react";
import userService from "../../services/users";
import User from "../User";
import { useMatch } from "react-router-dom";
import SingleBlog from "../SingleBlog";
import { useSelector } from "react-redux";

const Home = () => {
  const blogs = useSelector((state) => state.blogs);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);
  const match = useMatch("/users/:id");
  const user = match ? users.find((user) => user.id === match.params.id) : null;

  return (
    <div>
      <Navigation />
      <h2>blog app</h2>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/blogs/:id" element={<SingleBlog blogs={blogs} />} />
      </Routes>
    </div>
  );
};

export default Home;
