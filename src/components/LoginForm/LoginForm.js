import loginService from '../../services/login'

const LoginForm = ({ setUser, setMsg, setToken }) => {

  const handleLogin = (e) => {
    e.preventDefault()
    const username = e.target["username"].value
    const password = e.target["password"].value
    loginService.login({ username, password })
      .then(user => {
        setUser(user)
        setToken(user.token)
        console.log('this time we received this user', user);
        const userString = JSON.stringify(user)
        localStorage.setItem('user', userString)
      })
      .catch(err => {
        setMsg(err,'red')
      })
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

export default LoginForm;