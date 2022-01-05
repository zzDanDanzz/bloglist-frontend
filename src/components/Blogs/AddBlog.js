import { useState } from "react";

const AddBlog = ({ createNew }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }
  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createNew({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return <>
    <h2>add a new blog</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label><input type="text" name="title" value={title} onChange={handleTitleChange} />
      <br />
      <label htmlFor="author">Author:</label><input type="text" name="author" onChange={handleAuthorChange} />
      <br />
      <label htmlFor="url">URL:</label><input type="text" name="url" onChange={handleUrlChange} />
      <br />
      <button >Create</button>
    </form>
  </>;
};

export default AddBlog;