/// <reference types="Cypress" />

const user = {
  name: 'danny',
  username: 'boyyy',
  password: '123123'
}

const blog = {
  title: 'this is a title',
  author: 'johnyboi',
  url: 'yahoo.com',
  likes: 22
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

    describe('when blog created it can', function () {
      beforeEach(function () {
        const token = JSON.parse(localStorage.getItem('user')).token
        console.log('is this the token ??? ', token);
        cy.addblog(blog, token)
      })

      it('be liked', function () {
        cy.get('.blogs')
          .contains(`${blog.title} by ${blog.author}`)
          .find('button')
          .click()
          .parent()
          .find('button[name="like"]')
          .click()
          .parent()
          .should('contain.text', `Likes: ${blog.likes + 1}`)
      })

      it('be deleted by the user', function () {
        cy.get('.blogs')
          .contains(`${blog.title} by ${blog.author}`)
          .find('button')
          .click()
          .parent()
          .find('button[name="delete"]')
          .click()

        cy.contains('blog deleted')
          .should('have.css', 'color', 'rgb(255, 0, 0)')

        cy.get('body')
          .should('not.contain.text', `${blog.title} by ${blog.author}`)
      })

      it('NOT be deleted by another user', function () {
        const otherUser = {
          name: 'granny',
          username: 'girlll',
          password: '123123'
        }

        cy.contains('logout')
          .click()

        cy.request('POST', 'http://localhost:3003/api/users/', otherUser)

        cy.login(otherUser)

        cy.get('.blogs')
          .contains(`${blog.title} by ${blog.author}`)
          .find('button')
          .click()
          .parent()
          .find('button[name="delete"]')
          .should('not.exist')

        cy.get('body')
          .should('contain.text', `${blog.title} by ${blog.author}`)
      })
    })

  })
})