import React, { useState, useEffect } from 'react'
import AddBlog from './components/AddBlog'
import Blogs from './components/Blogs/Blogs'
import Form from './components/Form/Form'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

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
      {!user && <Form setUser={setUser} />}
      {user && <><p>Welcome, {user.name} <button onClick={handleLogout}>logout</button></p>
        <AddBlog token={token} blogs={blogs} setBlogs={setBlogs}/>
        <Blogs blogs={blogs} /></>}
    </div>
  )
}

export default App