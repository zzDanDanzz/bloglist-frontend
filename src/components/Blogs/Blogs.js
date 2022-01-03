import { useEffect } from 'react'
import Blog from "./Blog";
import blogService from '../../services/blogs'

const Blogs = ({ blogs, setBlogs, likeBlog, deleteBlog }) => {

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return <>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog}/>
    )}
  </>;
};

export default Blogs