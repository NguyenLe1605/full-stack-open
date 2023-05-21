import Notification from "../../components/Notification";
import LoginForm from "../../components/LoginForm";
import { useDispatch } from "react-redux";
import { updateNotifcation } from "../../reducers/notificationReducer";
import { loginUser } from "../../reducers/userReducer";
import Row from "react-bootstrap/Row";

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
    <Row className="align-items-center" style={{ height: "70vh" }}>
      <div className="mx-auto col-10 col-md-8 col-lg-4">
        <h2>log in to the application</h2>
        <Notification />
        <LoginForm onLogin={login} />
      </div>
    </Row>
  );
};

export default Login;
