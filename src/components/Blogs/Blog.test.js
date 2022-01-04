import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test("Displays title and author, but not likes or url", () => {
  const blog = { title: "Some title", author: "Johnson", url: "google.com", likes: 23}  

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    /Some title.*Johnson/
  )
  expect(component.container).not.toHaveTextContent(
    /.*google.com.*23/
  )
  
})