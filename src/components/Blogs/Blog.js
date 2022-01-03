import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {

  const border = {
    borderStyle: 'dashed',
    margin: '5px 0px',
    padding: '3px'
  }
  const [showMore, setShowMore] = useState(false)

  const handleLike = () => {
    likeBlog(blog.id, { likes: blog.likes + 1 })
  }

  return <>
    <div style={border}>
      {blog.title} by {blog.author} <button onClick={() => { setShowMore(!showMore) }}>{showMore ? 'Hide' : 'More'}</button>
      {showMore && <>
        <li>URL: {blog.url}</li>
        <li>Likes: {blog.likes} <button onClick={handleLike}>Like</button></li>
        <li>{blog.user.name}</li>
      </>
      }
    </div>
  </>
}

export default Blog