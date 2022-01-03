import React, { useState, useEffect, useRef } from 'react'
import Blogs from './Blogs/Blogs'
import LoginForm from './LoginForm/LoginForm'
import Notif from './Notification/Notif'
import blogService from "../services/blogs";
import Togglable from './Togglable';
import AddBlog from './Blogs/AddBlog';

const App = () => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [msg, setMsg] = useState({ content: null, color: null })
  const [blogs, setBlogs] = useState([])

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
    localStorage.removeItem("user");
  }

 const toggleRef = useRef()

  const handleCreate = (data) => {
    blogService.createNew(data, token)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setMsgPlus(`new blog ${newBlog.title} by ${newBlog.author}`)
        toggleRef.current.toggleHide()
      })
      .catch(err => { setMsgPlus(err, 'red') }) }

 

  const AddBlogForm = () => (
    <Togglable ref={toggleRef}>
      <AddBlog createNew={handleCreate}/>
    </Togglable>
  )

  return (
    <div>
      <Notif msg={msg} />
      {!user && <LoginForm setUser={setUser} setMsg={setMsgPlus} setToken={setToken} />}
      {user && <><p>Welcome, {user.name} <button onClick={handleLogout}>logout</button></p>
        {AddBlogForm()}
        <Blogs blogs={blogs} setBlogs={setBlogs} /></>}
    </div>
  )
}

export default App