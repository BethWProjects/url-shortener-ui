describe('Homepage flow', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {fixture: 'urls'}).as('urls')
    cy.visit('http://localhost:3000/')
    cy.wait('@urls').then(() => {
      'response.ok'
    })
  }) 
  it('user should see a homepage with title and shortened urls', () => {
    cy.get('h1')
    cy.get('.url').find('h3').contains('Awesome photo')
    cy.get('.url').find('a').contains('http://localhost:3001/useshorturl/1')
    cy.get('.url').find('p').contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')

  })
  it('user can view the form with proper inputs', () => {
    cy.get('[placeholder="Title..."]').should('exist')
    cy.get('[placeholder="URL to Shorten..."]').should('exist')
    cy.get('button').should('exist')
  })
  it('user can fill out the form, information is reflected in the input fields', () => {
    cy.get('[placeholder="Title..."]').type('Beth')
    cy.get('[placeholder="URL to Shorten..."]').type('http://beth.org/oulkjsdfwe')
  })

  it('user can fill out the form, submit and view the card on the homepage', () => {
    cy.get('[placeholder="Title..."]').type('Beth')
    .get('[placeholder="URL to Shorten..."]').type('http://beth.org/oulkjsdfwe')
    .get('button').click()
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201, 
      body: {
        title: "Beth",
        long_url: "http://beth.org/oulkjsdfwe",
        short_url: "http://localhost:3001/useshorturl/22"
      }
    })
    .get('.url').last()
  })
})