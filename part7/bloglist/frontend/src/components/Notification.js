import { useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification);
  if (message === null || message === undefined || message === "") {
    return null;
  }

  const variant = isError ? "danger" : "success";

  return (
    <Alert className="notification" variant={variant}>
      {message}
    </Alert>
  );
};

export default Notification;
