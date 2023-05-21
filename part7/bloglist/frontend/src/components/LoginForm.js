import Input from "./Input";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginForm = ({ onLogin }) => {
  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Form onSubmit={handleLogin} className="login-form">
      <Input
        id="username"
        type="text"
        name="username"
        value={username}
        handleChange={({ target }) => setUsername(target.value)}
      />
      <Input
        id="password"
        type="password"
        name="password"
        value={password}
        handleChange={({ target }) => setPassword(target.value)}
      />
      <Button className="mt-3" variant="primary" type="submit">
        login
      </Button>
    </Form>
  );
};

export default LoginForm;
