import React, { useState, useEffect } from 'react'
import Blogs from './Blogs/Blogs'
import LoginForm from './LoginForm/LoginForm'
import Notif from './Notification/Notif'

const App = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [msg, setMsg] = useState({ content: null, color: null })

  const setMsgPlus = (content, color) => {
    setMsg({ content, color })
    setTimeout(() => {
      setMsg({ content: null })
    }, 5000);
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser);
      setToken(parsedUser.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user");
  }

  return (
    <div>
      <Notif msg={msg} />
      {!user && <LoginForm setUser={setUser} setMsg={setMsgPlus} setToken={setToken} />}
      {user && <>
        <p>Welcome, {user.name} <button onClick={handleLogout}>logout</button></p>
        <Blogs token={token} setMsg={setMsgPlus} user={user}/>
      </>}
    </div>
  )
}

export default App