describe('Poem app', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        username: 'lil phantasm',
        password: '12345',
      }
      window.localStorage.removeItem('loggedPoemUser')
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    describe('Login', () => {
      it('succeeds with correct credentials', () => {
        cy.get('[data-cy=link-login]').click()
  
        cy.get('[data-cy=username]').type('lil phantasm')
        cy.get('[data-cy=password]').type('12345')
        cy.get('[data-cy=login-button]').click()
        cy.get('html').should('contain', 'lil phantasm')
      })
  
      it('fails with wrong credentials', () => {
        cy.get('[data-cy=link-login]').click()
        cy.get('[data-cy=username]').type('lil phantasm')
        cy.get('[data-cy=password]').type('wrong')
        cy.get('[data-cy=login-button]').click()
  
        cy.get('.error').should('contain', 'wrong credentials')
        cy.get('.header-span').should('not.contain', 'lil phantasm is logged in')
      })
    })

    describe('Add Rap', () => {
      it('creates a new rap', () => {
        cy.request('POST', 'http://localhost:3003/api/login', {username: 'lil phantasm', password: '12345'})

        cy.get('[data-cy=link-new-rap]').click()
        cy.get('[data-cy=poemTitle').type('New Rap')
        cy.get('[data-cy=poemContent').type('First Line')
        cy.get('[data-cy=create-button]').click()

        cy.get('html').should('contain', 'new rap New Rap created')
      })

    })


  })