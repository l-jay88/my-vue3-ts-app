describe('登录流程', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('登录页能正常加载', () => {
    cy.visit('/login')
    cy.contains('登录').should('be.visible')
  })

  it('登录表单有三个输入框和一个下拉框', () => {
    cy.visit('/login')
    cy.get('input[type="text"]').should('exist')
    cy.get('input[type="email"]').should('exist')
    cy.get('input[type="password"]').should('exist')
    cy.get('select#role').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })

  it('填写表单并登录成功后跳转到 todoList', () => {
    cy.visit('/login')
    cy.get('input[type="text"]').clear().type('张三')
    cy.get('input[type="email"]').clear().type('zhangsan@example.com')
    cy.get('input[type="password"]').clear().type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/todo-list')
  })

  it('有 redirect 参数时，登录后跳转到原目标页', () => {
    cy.visit('/login?redirect=%2Fabout')
    cy.get('input[type="text"]').clear().type('张三')
    cy.get('input[type="email"]').clear().type('zhangsan@example.com')
    cy.get('input[type="password"]').clear().type('123456')
    cy.get('button[type="submit"]').click()
    cy.url().should('eq', Cypress.config('baseUrl') + '/about')
  })

  it('登录成功后 localStorage 里有 token', () => {
    cy.visit('/login')
    cy.get('input[type="text"]').clear().type('张三')
    cy.get('input[type="email"]').clear().type('zhangsan@example.com')
    cy.get('input[type="password"]').clear().type('123456')
    cy.get('button[type="submit"]').click()
    cy.wait(500)
    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('zhangsan@example.com')
    })
  })
})
