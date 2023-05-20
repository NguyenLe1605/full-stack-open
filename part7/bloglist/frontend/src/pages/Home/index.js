import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "../../components/Navigation";
import Blogs from "../Blogs";
import Users from "../Users";
import { useEffect, useState } from "react";
import userService from "../../services/users";
const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <Router>
      <Navigation />
      <h2>blog app</h2>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users users={users} />} />
      </Routes>
    </Router>
  );
};

export default Home;
