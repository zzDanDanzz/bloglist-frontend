import { useState, useEffect } from 'react'
import Togglable from "../Togglable";
import AddBlog from "./AddBlog";
import Blog from "./Blog";
import blogService from '../../services/blogs'

const Blogs = ({ token, setMsg }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return <>
    <Togglable>
      <AddBlog token={token} blogs={blogs} setBlogs={setBlogs} setMsg={setMsg} />
    </Togglable>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </>;
};

export default Blogs