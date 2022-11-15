describe('Homepage flow', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'urls'}).as('urls')
    cy.visit('http://localhost:3000/')
    cy.wait('@urls').then(() => {
      'response.ok'
    })
  }) 
  it('user should see a homepage with title', () => {
    cy.get('h1')
  })
})