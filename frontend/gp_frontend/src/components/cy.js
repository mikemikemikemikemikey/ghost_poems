describe('Poem app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'lil phantasm',
      password: '12345',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('[data-cy=link-login]').click()

      cy.get('[data-cy=username]').type('lil phantasm')
      cy.get('[data-cy=password]').type('12345')
      cy.get('[data-cy=login-button]').click()
      cy.get('html').should('contain', 'lil phantasm is logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('[data-cy=link-login]').click()
      cy.get('[data-cy=username]').type('lil phantasm')
      cy.get('[data-cy=password]').type('wrong')
      cy.get('[data-cy=login-button]').click()

      cy.get('.error').should('contain', 'wrong credentials')
      cy.get('html').should('not.contain', 'lil phantasm is logged in')
    })
  })
})