import { useEffect, useRef, useState } from 'react'
import Blog from "./Blog";
import blogService from '../../services/blogs'
import Togglable from '../Togglable';
import AddBlog from './AddBlog';

const Blogs = ({ token, setMsg, user }) => {

  const [blogs, setBlogs] = useState([])

  const toggleRef = useRef()

  const setBlogsPlus = (blogs) => {
    setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
  }

  const handleCreate = (data) => {
    blogService.createNew(data, token)
      .then(newBlog => {
        setBlogsPlus(blogs.concat({ ...newBlog, user }))
        setMsg(`new blog ${newBlog.title} by ${newBlog.author}`)
        toggleRef.current.toggleHide()
      })
      .catch(err => { setMsg(err, 'red') })
  }

  const handleUpdate = (id, data) => {
    blogService.updateBlog(id, data, token)
      .then(updatedBlog => {
        const likes = updatedBlog.likes
        setBlogsPlus(blogs.map(b => b.id === id ? { ...b, likes } : b))
      })
      .catch(err => { setMsg(err, 'red') })
  }

  const handleDelete = (id) => {
    blogService.deleteBlog(id, token)
      .then(() => {
        setBlogsPlus(blogs.filter(b => b.id !== id))
      })
      .catch(err => { setMsg(err, 'red') })
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogsPlus(blogs)
    }
    )
  }, [])


  const AddBlogForm = () => (
    <Togglable ref={toggleRef}>
      <AddBlog createNew={handleCreate} />
    </Togglable>
  )

  return <>
    {AddBlogForm()}
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} likeBlog={handleUpdate} deleteBlog={handleDelete} user={user} />
    )}
  </>;
};

export default Blogs