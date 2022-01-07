/// <reference types="Cypress" />

const user = {
  name: 'danny',
  username: 'boyyy',
  password: '123123'
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
})