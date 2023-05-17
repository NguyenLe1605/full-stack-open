import { useSelector } from "react-redux";
const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification);
  if (message === null || message === undefined || message === "") {
    return null;
  }

  const color = isError ? "red" : "green";
  const notifStyle = {
    color: color,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return (
    <div className="notification" style={notifStyle}>
      {message}
    </div>
  );
};

export default Notification;
