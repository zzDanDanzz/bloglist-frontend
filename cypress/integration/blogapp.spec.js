/// <reference types="Cypress" />

const user = {
  name: 'danny',
  username: 'boyyy',
  password: '123123'
}

const blog = {
  title: 'this is a title',
  author: 'johnyboi',
  url: 'yahoo.com'
}

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('form').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('form')
        .find("input[name='username']")
        .type(user.username)
      cy.get('form')
        .find("input[name='password']")
        .type(user.password)
      cy.get('form')
        .contains('login')
        .click()
      cy.contains(`Welcome, ${user.name}`).find('button').should('contain.text', 'logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('form')
        .find("input[name='username']")
        .type('foo')
      cy.get('form')
        .find("input[name='password']")
        .type('bar')
      cy.get('form')
        .contains('login')
        .click()
      cy.should('not.contain.text', 'Welcome, ')
      cy.contains(/invalid (username|password)/).should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(user)
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog')
        .click()

      cy.get('input[name="title"]')
        .type(blog.title)
      cy.get('input[name="author"]')
        .type(blog.author)
      cy.get('input[name="url"]')
        .type(blog.url)

      cy.get('form')
        .contains('Create')
        .click()

      cy.contains(`${blog.title} by ${blog.author}`)
        .should('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('.blogs')
        .contains(`${blog.title} by ${blog.author}`)
        .should('have.css', 'border-style', 'dashed')
    })
  })
})