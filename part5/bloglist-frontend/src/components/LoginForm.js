import Input from "./Input";
import { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({
  handleLoginResponse,
  handleError
}) => {

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.login({ username, password });
      handleLoginResponse(response);
      setUsername("");
      setPassword("");
    } catch (exception) {
      handleError();
    }
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form onSubmit={handleLogin} className="login-form">
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
        name="password" value={password}
        handleChange={({ target }) => setPassword(target.value)}/>
      <button type="submit">login</button>
    </form>
  );
};


export default LoginForm;