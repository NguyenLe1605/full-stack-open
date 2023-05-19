import Notification from "../../components/Notification";
import LoginForm from "../../components/LoginForm";
import { useDispatch } from "react-redux";
import { updateNotifcation } from "../../reducers/notificationReducer";
import { loginUser } from "../../reducers/userReducer";

const Login = () => {
  const dispatch = useDispatch();
  const login = async (username, password) => {
    try {
      await dispatch(loginUser(username, password));
    } catch (exception) {
      dispatch(updateNotifcation("wrong username or password", true));
    }
  };

  return (
    <div>
      <h2>log in to the application</h2>
      <Notification />
      <LoginForm onLogin={login} />
    </div>
  );
};

export default Login;
