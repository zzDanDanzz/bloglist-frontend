import React, { useState, useEffect } from 'react'
import AddBlog from './components/AddBlog'
import Blogs from './components/Blogs/Blogs'
import Form from './components/Form/Form'
import Notif from './components/Notification/Notif'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [msg, setMsg] = useState({content: null, color: null})

  const setMsgPlus = (content, color) => {
    setMsg({content, color})
    setTimeout(() => {
      setMsg({content: null})
    }, 5000);
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
    localStorage.removeItem("user");
  }

  return (
    <div>
      <Notif msg={msg} />
      {!user && <Form setUser={setUser} setMsg={setMsgPlus}/>}
      {user && <><p>Welcome, {user.name} <button onClick={handleLogout}>logout</button></p>
        <AddBlog token={token} blogs={blogs} setBlogs={setBlogs} setMsg={setMsgPlus}/>
        <Blogs blogs={blogs} /></>}
    </div>
  )
}

export default App