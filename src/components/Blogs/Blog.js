import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {

  const border = {
    borderStyle: 'dashed',
    margin: '5px 0px',
    padding: '3px'
  }
  const [showMore, setShowMore] = useState(false)

  const handleLike = () => {
    const data = { ...blog, likes: blog.likes + 1, user: user.id }
    delete data.id
    likeBlog(blog.id, data)
  }

  const handleDelete = () => {
    if (!window.confirm('remove?')) return
    deleteBlog(blog.id)
  }

  return <>
    <div style={border}>
      {blog.title} by {blog.author} <button onClick={() => { setShowMore(!showMore) }}>{showMore ? 'Hide' : 'More'}</button>
      {showMore && <>
        <li>URL: {blog.url}</li>
        <li>Likes: {blog.likes} <button name='like' onClick={handleLike}>Like</button></li>
        <li>{blog.user.name}</li>
        {user.id === blog.user.id && <button onClick={handleDelete}>Delete</button>}
      </>
      }
    </div>
  </>
}

export default Blog