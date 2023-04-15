import Input from "./Input"

const LoginForm = (props) => {
    const {onSubmit, credentials, setCredentials} = props
    const {setUsername, setPassword} = setCredentials
    return (
        <form onSubmit={onSubmit}>
          <Input id="username" type="text" name="username" value={credentials.username} setState={setUsername} />
          <Input id="password" type="password" name="password" value={credentials.password} setState={setPassword} />
          <button type="submit">login</button>
        </form>
    )
}


export default LoginForm