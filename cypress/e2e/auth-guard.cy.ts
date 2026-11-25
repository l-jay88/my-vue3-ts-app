describe('路由守卫', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('未登录访问受保护页面会跳转登录', () => {
    cy.visit('/about')
    cy.url().should('include', '/login')
    cy.url().should('include', 'redirect=/about')
  })

  it('未登录访问 /todo-list 会跳转登录', () => {
    cy.visit('/todo-list')
    cy.url().should('include', '/login')
  })

  it('未登录访问 /login 页面可以正常显示', () => {
    cy.visit('/login')
    cy.contains('登录').should('be.visible')
    cy.url().should('include', '/login')
  })

  it('未登录访问 /todo-detail/:id 可以直接访问（无需权限）', () => {
    cy.visit('/todo-detail/42')
    cy.url().should('include', '/todo-detail/42')
  })
})
