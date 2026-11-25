// https://on.cypress.io/api

describe('My First Test', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/login')
    cy.get('input[type="text"]').clear().type('测试管理员')
    cy.get('select#role').select('admin')
    cy.get('input[type="email"]').clear().type('admin@test.com')
    cy.get('input[type="password"]').clear().type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/todo-list')
  })
  it('visits the app root url', () => {
    cy.visit('/about')
    cy.contains('h1', 'This is an about page')
  })
})
