import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = {username: 'dandan', name: 'dan'}
const blog = { title: "Some title", author: "Johnson", url: "google.com", likes: 23, user}  

test("Displays title and author, but not likes or url", () => {

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  expect(component.container).toHaveTextContent(
    /Some title.*Johnson/
  )
  expect(component.container).not.toHaveTextContent(
    /.*google.com.*23/
  )
  
})

test("'more' button shows url and likes", () => {

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const moreBtn = component.getByText('More')

  fireEvent.click(moreBtn)

  expect(component.container).toHaveTextContent(/Some title.*Johnson.*google.com.*23/)

})