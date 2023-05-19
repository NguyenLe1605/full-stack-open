import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import Notification from "./Notification";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const style = {
    marginBottom: 20,
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div style={style}>{user.name} logged in to the application</div>
      <button style={style} onClick={handleLogout}>
        logout
      </button>
    </div>
  );
};

export default Header;
