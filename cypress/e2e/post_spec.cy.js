describe("post flow", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
      fixture: "urls.json",
    }).as("urls");
    cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
      fixture: "post.json",
    }).as("post");
    cy.visit("http://localhost:3000/");
  });
  it('user can fill out the form, submit and view the card on the homepage', () => {
    cy.get('[placeholder="Title..."]').type('Beth')
    .get('[placeholder="URL to Shorten..."]').type('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1280px-Sunflower_from_Silesia2.jpg')
    .get('button').click()
    .get('.url').last()
    cy.get('section > :nth-child(2)').get('section > :nth-child(2)').contains('Beth')
    cy.get('section > :nth-child(2)').get('section > :nth-child(2)').contains('http://localhost:3001/useshorturl/2')
    cy.get('section > :nth-child(2)').get(':nth-child(2) > p').contains('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Sunflower_from_Silesia2.jpg/1280px-Sunflower_from_Silesia2.jpg')

  })
})