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

    it("dragging slider", () => {
        const profit = 0.11
        const threshold = "94"
        const multiplier = "1.01"
        const chance = "94"

        cy.get('cw-range[formcontrolname="underOver"] > .slider > .handle')
            .invoke('attr', 'style', 'right: 6%')
            .should('have.attr', 'style', 'right: 6%').click()

        cy.get('span[data-cy="value"]').should("contain", profit)
        cy.get('input[data-test="threshold"]').invoke('val').should('eq', threshold)
        cy.get('input[data-test="multiplier"]').invoke('val').should('eq', multiplier)
        cy.get('input[data-test="chance"]').invoke('val').should('eq', chance)
    })

    it("Updating inputs makes other inputs update", () => {
        cy.get('input[data-test="threshold"]').clear().type("16")
        cy.get('input[data-test="multiplier"]').invoke('val').should('eq', "5.94")
        cy.get('input[data-test="chance"]').invoke('val').should('eq', "16")
        cy.get('span[data-cy="value"]').should("contain", "54.34")
    })

    it("Checking roll count", () => {
        const moreThanMax = 51
        const inRange = 35
        cy.get('[data-test="mode-batch"]').click()

        cy.get('input[data-test="rolls-per-click"]').clear()
        cy.get('mat-error').should('contain', '1 Min. ')
        cy.contains(`ROLL ${0} TIMES`).should('be.disabled')

        cy.get('input[data-test="rolls-per-click"]').type(moreThanMax.toString())
        cy.get('mat-error').should('contain', '50 Max. ')
        cy.contains(`ROLL ${moreThanMax} TIMES`).should('be.disabled')

        cy.get('input[data-test="rolls-per-click"]').clear().type(inRange.toString())
        cy.contains(` ROLL ${inRange} TIMES `).should('not.be.disabled')

    })
})


