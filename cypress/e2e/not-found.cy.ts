describe('404 页面', () => {
  it('访问不存在的路径显示 404 页面', () => {
    cy.visit('/this-path-does-not-exist')
    cy.contains('未找到').should('be.visible')
  })

  it('深层不存在路径也能匹配到 404', () => {
    cy.visit('/a/b/c/d/e')
    cy.contains('未找到').should('be.visible')
  })

  it('404 页面的返回按钮能回到首页', () => {
    cy.visit('/totally-wrong-path')
    cy.contains('返回列表').click()
    cy.url().should('include', '/')
  })
})
