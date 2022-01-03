import { useState } from "react";

const AddBlog = ({ createNew }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target["title"].value
    const author = e.target["author"].value
    const url = e.target["url"].value

    createNew({ title, author, url })


    for (const input of ['title', 'author', 'url']) {
      e.target[input].value = ""
    }
  }

  return <>
    <h2>add a new blog</h2>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label><input type="text" name="title"/>
      <br />
      <label htmlFor="author">Author:</label><input type="text" name="author"/>
      <br />
      <label htmlFor="url">URL:</label><input type="text" name="url"/>
      <br />
      <button >Create</button>
    </form>
  </>;
};

export default AddBlog;