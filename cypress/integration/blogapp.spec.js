/// <reference types="Cypress" />
import { wait } from '@testing-library/react'
import { user, blog, otherUser, multipleBlogs } from '../blogapp_helpers'

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
        cy.addblog(blog, token).then(() => {
          // the added blog would sometimes not show up without the cy.visit
          cy.visit('http://localhost:3000')
        })
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

    describe('multiple blogs are created', function () {
      beforeEach(function () {
        const token = JSON.parse(localStorage.getItem('user')).token
        for (const blog of multipleBlogs) {
          cy.addblog(blog, token)
        }
        cy.visit('http://localhost:3000')
      })

      it('they are ordered by their number likes', function () {
        cy.contains(multipleBlogs[0].title)
        cy.get('.blog button').click({ multiple: true })

        for (const i in multipleBlogs) {
          cy.contains(`${multipleBlogs[i].title} by ${multipleBlogs[i].author}`).as('blog' + i)
          const range = parseInt(i)+1
          for (let j = 0; j < range; j++) {
            cy.get('@blog' + i).find('button[name="like"]').click()
            .parent().contains(`Likes: ${j+1}`)
          }
        }

        let k = 3
        cy.get('.blog').each((elem) => {
          cy.wrap(elem).should('contain.text', `${multipleBlogs[k-1].title} by ${multipleBlogs[k-1].author}`)
          .and('contain.text', `Likes: ${k}`)
          k--
        })

      })
    })
  })
})