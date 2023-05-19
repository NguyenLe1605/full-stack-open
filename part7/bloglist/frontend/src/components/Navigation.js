import { Link } from "react-router-dom";

const Navigation = () => {
  const style = {
    padding: 5,
    paddingBottom: 10,
  };
  return (
    <div>
      <Link style={style} to="/">
        blogs
      </Link>
    </div>
  );
};

export default Navigation;
