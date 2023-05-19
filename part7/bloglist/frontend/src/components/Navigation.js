import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const linkStyle = {
    padding: 5,
    paddingBottom: 10,
  };

  const navigationStyle = {
    padding: 5,
    backgroundColor: "#d3d3d3",
  };

  const buttonStyle = {
    marginLeft: 7,
  };

  return (
    <div className="nav" style={navigationStyle}>
      <Link style={linkStyle} to="/">
        blogs
      </Link>
      <Link style={linkStyle} to="/users">
        users
      </Link>
      <span>{user.name} logged in to the application</span>
      <button style={buttonStyle} onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Navigation;
