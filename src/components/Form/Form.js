import loginService from '../../services/login'

const Form = ({setUser}) => {

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target["username"].value
    const password = e.target["password"].value
    const user = await loginService.login({ username, password })
    setUser(user)
  }

  return <>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <label htmlFor="username">username: </label>
      <input type="text" name="username" />
      <br />
      <label htmlFor="password">password: </label>
      <input type="text" name="password" />
      <br />
      <button type="submit">login</button>
    </form>
  </>;
};

export default Form;