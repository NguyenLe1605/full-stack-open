import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogsReducer";
import { loadUser } from "./reducers/userReducer";
import Login from "./pages/Login";
import Notification from "./components/Notification";
import Home from "./pages/Home";
import { BrowserRouter as Router } from "react-router-dom";

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
      <Notification />
      <Router>
        <Home />
      </Router>
    </div>
  );
};

export default App;
