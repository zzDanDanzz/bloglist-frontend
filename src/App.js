import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs/Blogs'
import Form from './components/Form/Form'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser));
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
        <Blogs blogs={blogs} /></>}
    </div>
  )
}

export default App