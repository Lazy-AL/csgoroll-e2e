describe('csgoroll-E2E-test', () => {
  it('visit the website', () => {
    // cy.request('')
    cy.visit('/', {
      auth: {username: 'ancient', password: 'things',}
    });

  });

  it("Bet +1 / +10 / 1/2 / X2 buttons work as expected", () => {
    let num = 0
    cy.get('span[data-cy="value"]').as("profit")
    cy.get('button[data-test="clear"]').click()
    //plus 1
    cy.get('button[data-test="plus-1"]').click()
    num += 1
    cy.get('@profit').should("contain", `${num.toFixed(2)}`, {timeout: 1000})
    //plus 10
    cy.get('button[data-test="plus-10"]').click()
    num += 10
    cy.get('@profit').should("contain", `${num.toFixed(2)}`, {timeout: 1000})
    //devide by 2
    cy.get('button[data-test="1-div-2"]').click()
    num /= 2
    cy.get('@profit').should("contain", `${num.toFixed(2)}`, {timeout: 1000})
    //multiply by 2
    cy.get('button[data-test="x2"]').click()
    num *= 2
    cy.get('@profit').should("contain", `${num.toFixed(2)}`, {timeout: 1000})
  })

  it("Roll under/over switch changes value", () => {

    cy.get('label[data-test="choice-label"]').as('roll')
    cy.get('button[data-test="choice-switch"]').as('switch')

    cy.get('@switch').click()
    cy.get('@roll').should('contain', ' Roll ')
        .should('contain', 'Over')

    cy.get('@switch').click()
    cy.get('@roll').should('contain', ' Roll ')
        .should('contain', 'Under')
  })
})


