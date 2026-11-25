describe('Todo 功能', () => {
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

  it('能正常加载 TodoList 页面', () => {
    cy.contains('ToDoList').should('be.visible')
    cy.contains('新增待办').should('be.visible')
  })

  it('能添加新的待办事项', () => {
    cy.get('.todo-input').type('写单元测试')
    cy.get('.add-btn').click()
    cy.contains('写单元测试').should('be.visible')
  })

  it('添加空待办不会新增', () => {
    cy.get('.todo-input').clear()
    cy.get('.add-btn').click()
    cy.get('.todo-list').find('li').should('have.length', 0)
  })

  it('按回车键也能添加待办', () => {
    cy.get('.todo-input').type('学 Vue Router{enter}')
    cy.contains('学 Vue Router').should('be.visible')
  })

  it('点击待办项能切换完成状态', () => {
    cy.get('.todo-input').type('待办1')
    cy.get('.add-btn').click()
    cy.contains('待办1').click()
    cy.contains('✅ 已完成').should('be.visible')
  })

  it('搜索框能过滤待办', () => {
    cy.get('.todo-input').clear().type('苹果{enter}')
    cy.get('.todo-input').clear().type('香蕉{enter}')
    cy.get('.search-input').type('苹果')
    cy.wait(350)
    cy.get('.todo-list li').should('have.length', 1)
    cy.contains('苹果').should('be.visible')
    cy.contains('香蕉').should('not.exist')
  })

  it('待办数据刷新后持久化到 localStorage', () => {
    cy.get('.todo-input').type('持久化测试{enter}')
    cy.wait(150)
    cy.reload()
    cy.contains('持久化测试').should('be.visible')
  })
})
