import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import Button from "react-bootstrap/esm/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const Navigation = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="nav"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">users</Link>
          </Nav.Link>
        </Nav>
        <Nav className="me-auto">
          <Navbar.Text>{user.name} logged in to the application</Navbar.Text>
        </Nav>
        <Button onClick={handleLogout}>logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
