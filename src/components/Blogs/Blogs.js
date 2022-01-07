import { useEffect, useRef, useState } from 'react'
import Blog from "./Blog";
import blogService from '../../services/blogs'
import Togglable from '../Togglable';
import AddBlog from './AddBlog';
import PropTypes from 'prop-types';

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
        setMsg('blog deleted', 'red')
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

  return <div className='blogs'>
    {AddBlogForm()}
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} likeBlog={handleUpdate} deleteBlog={handleDelete} user={user} />
    )}
  </div>
};

Blogs.propTypes = {
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  setMsg: PropTypes.func.isRequired
}

export default Blogs

