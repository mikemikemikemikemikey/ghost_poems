
describe('Test sockets', () => {

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


    it('shows when a different user submits rap', () => {
      cy.request('http://localhost:3003/api/testing/newrap').then(() =>{

        cy.request('http://localhost:3009/connect').then(() => {
          cy.request('http://localhost:3009/emitrap').then(() =>{
            cy.get('html').should('contain', 'socket title')
          })
        })
      })
    })
  })