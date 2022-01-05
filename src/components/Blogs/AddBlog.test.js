import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import AddBlog from './AddBlog'

test("'createNew' receives correct input", () => {

  const createNew = jest.fn()

  const component = render(
    <AddBlog createNew={createNew} />
  )

  const title = component.container.querySelector('input[name="title"]')
  const author = component.container.querySelector('input[name="author"]')
  const url = component.container.querySelector('input[name="url"]')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {target: {value: 'some title'}})
  fireEvent.change(author, {target: {value: 'johnyboi'}})
  fireEvent.change(url, {target: {value: 'yahoo.com'}})
  
  fireEvent.submit(form)

  expect(createNew.mock.calls).toHaveLength(1)
  expect(createNew.mock.calls[0][0].title).toBe('some title')
  expect(createNew.mock.calls[0][0].author).toBe('johnyboi')
  expect(createNew.mock.calls[0][0].url).toBe('yahoo.com')

})