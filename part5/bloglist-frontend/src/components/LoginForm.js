import Input from "./Input";
import { useState } from "react";


const LoginForm = ({ onLogin }) => {

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(username, password);
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