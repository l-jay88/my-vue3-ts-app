describe('首页和导航', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('访问根路径能正常加载首页', () => {
    cy.visit('/')
    cy.contains('Home').should('be.visible')
  })

  it('导航栏显示三个链接', () => {
    cy.visit('/')
    cy.get('nav').find('a').should('have.length', 3)
    cy.contains('Home').should('exist')
    cy.contains('About').should('exist')
    cy.contains('ToDoList').should('exist')
  })

  it('点击 Home 链接跳转到首页', () => {
    cy.visit('/')
    cy.contains('Home').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/')
  })

  it('未登录访问 /todo-list 会被重定向到登录页', () => {
    cy.visit('/todo-list')
    cy.url().should('include', '/login')
    cy.url().should('include', 'redirect=/todo-list')
  })

  it('未登录访问 /todo-detail/1 能直接访问（无 requiresAuth）', () => {
    cy.visit('/todo-detail/1')
    cy.url().should('include', '/todo-detail/1')
  })
})
