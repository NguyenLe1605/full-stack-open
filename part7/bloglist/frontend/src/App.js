import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { loadUser } from "./reducers/userReducer";
import Login from "./pages/Login";
import Header from "./components/Header.js";
import Blogs from "./pages/Blogs";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  if (user === null || user === undefined) {
    return <Login />;
  }

  return (
    <div>
      <Header />
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Blogs />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
