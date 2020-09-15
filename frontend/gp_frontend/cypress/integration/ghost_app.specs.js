const baseUrl = Cypress.config().baseUrl

describe('Poem app', () => {
    beforeEach(() => {
      cy.request('http://localhost:3003/api/testing/reset')
      const user = {
        username: 'lil phantasm',
        password: '12345',
      }
      window.localStorage.removeItem('loggedPoemUser')
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })
  /*
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
*/
    describe('functinality while logged in', () => {
/*
      it('creates a new rap', () => {
        cy.get('[data-cy=link-login]').click()
        cy.get('[data-cy=username]').type('lil phantasm')
        cy.get('[data-cy=password]').type('12345')
        cy.get('[data-cy=login-button]').click()
        
        cy.wait(500)
        
        cy.get('[data-cy=link-new-rap]').click()
          cy.get('[data-cy=poemTitle').type('New Rap')
          cy.get('[data-cy=poemContent').type('First Line')
          cy.get('[data-cy=create-button]').click()

          cy.get('html').should('contain', 'new rap New Rap created')
     
      })

      it('likes a rap ', () => {
        cy.request('http://localhost:3003/api/testing/newrap').then(() => {
          cy.visit(baseUrl)
          cy.get('[data-cy=link-login]').click()
          cy.get('[data-cy=username]').type('lil phantasm')
          cy.get('[data-cy=password]').type('12345')
          cy.get('[data-cy=login-button]').click()

          cy.wait(500)
          cy.get('[data-cy=enjoy]').click()
          cy.wait(500)
          cy.get('html').should('contain', 'enjoys:1') 
        })
     
      })

      it('dislikes a rap ', () => {
       cy.request('http://localhost:3003/api/testing/alreadyliked').then(() => {
        cy.visit(baseUrl)
        cy.get('[data-cy=link-login]').click()
        cy.get('[data-cy=username]').type('lil phantasm')
        cy.get('[data-cy=password]').type('12345')
        cy.get('[data-cy=login-button]').click()

        cy.wait(500)

        cy.get('html').should('contain', 'enjoys:1')
        cy.get('[data-cy=enjoy]').click()
        cy.get('html').should('contain', 'enjoys:0')
       }) 
      })

      it('successfully adds to rap', () => {
        cy.request('http://localhost:3003/api/testing/newrap').then(() => {
          cy.visit(baseUrl)
          cy.get('[data-cy=link-login]').click()
          cy.get('[data-cy=username]').type('lil phantasm')
          cy.get('[data-cy=password]').type('12345')
          cy.get('[data-cy=login-button]').click()

          cy.wait(500)
          
          cy.get('[data-cy=contribute-toggle]').click()
          cy.get('[data-cy=content-input]').type('test contribution')
          cy.get('[data-cy=content-submit]').click()
          cy.get('html').should('contain', 'test contribution')          
      })
    })
*/
      it('edits own content', () => {
        cy.request('http://localhost:3003/api/testing/alreadyliked').then(() => {
          cy.visit(baseUrl)
          cy.get('[data-cy=link-login]').click()
          cy.get('[data-cy=username]').type('lil phantasm')
          cy.get('[data-cy=password]').type('12345')
          cy.get('[data-cy=login-button]').click()

          cy.wait(500)

          cy.get('[data-cy=poem-title]').click()
          cy.get('[data-cy=title-input]').clear().type('changed title')
          cy.get('[data-cy=title-submit]').click()

          cy.get('html').should('contain', 'changed title')
          cy.get('html').should('not.contain', 'Liked title')
        })
      })
  })
})