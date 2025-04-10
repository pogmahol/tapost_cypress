import {navigateTo} from "../support/page_objects/navigationPages";

describe('template spec', () => {
    beforeEach('Open URL:', () =>{
        cy.visit('https://tapost.fly.dev/')
    })

    it('passes', () => {
        //cy.visit('https://tapost.fly.dev/')
       // cy.contains('Forms').click()
       // cy.contains('Form Layouts').click()
        navigateTo.formLayoutsPage()
        cy.contains('Sign in').click()
        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .click()
            .parents('form')
            .find('[status="warning"]')
            .click()
    })
    it('Clean code with Aliases and Callback function', () => {
       // cy.visit('https://tapost.fly.dev/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email')

        // don't use this approach
        // const gridContainer = cy.contains('nb-card', 'Using the Grid')
        // gridContainer.find('[for="inputPassword2"]').should('contain','Password')
        // gridContainer.find('[for="inputEmail1"]').should('contain','Email')

        //Alias
        cy.contains('nb-card', 'Using the Grid').as('gridContainer')
        cy.get('@gridContainer')
            .find('[for="inputEmail1"]')
            .should('contain', 'Email')

        cy.get('@gridContainer')
            .find('[for="inputPassword2"]')
            .should('contain', 'Password')

        //callback - inside this function
        cy.contains('nb-card', 'Using the Grid').then(usingGrid => {
            cy.wrap(usingGrid).find('[for="inputPassword2"]').should('contain', 'Password')
        })
    })

    // it('Extracting Text and attribute values', () => {
    //     cy.visit('https://tapost.fly.dev/')
    //     cy.contains('Forms').click()
    //     cy.contains('Form Layouts').click()
    //
    //     cy.get('[for="exampleInputEmail1"]')
    //         .should('contain', 'Email address')
    //
    //     cy.get('[for="exampleInputEmail1"]').then(value => {
    //         let extractedValue = value.text();
    //         expect(extractedValue).to.be.eq('Email address')
    //         cy.wrap(value).should('contain', 'Email address')
    //
    //         cy.get('[for="exampleInputEmail1"]')
    //             .invoke('text')
    //             .should('contain', 'Email address')
    //
    //         cy.get('[for="exampleInputEmail1"]')
    //             .invoke('attr', 'class').then(attribute => {
    //             expect(attribute).eq('label')
    //             cy.wrap(attribute).should('contain', 'label')
    //     })
    //
    //         cy.get('#exampleInputEmail1').type('qrqrqrq')
    //         cy.get('#exampleInputEmail1').invoke('prop','value').should('contain', 'qrqrqrq')
    //
    //     })
    it('radio buttons', () => {

        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').within(() => {
            cy.get('[type="radio"]').then(radioButtons => {
                cy.wrap(radioButtons).eq(0).check({force: true}).should('be.checked')
                cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked')
                cy.wrap(radioButtons).eq(0).should('not.be.checked')


            })
        })
    })
    it('Chechboxes ', () => {

        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type="checkbox"]').check({force:true})
        cy.get('[type="checkbox"]').uncheck({force:true})

        cy.get('[type="checkbox"]').eq(0).check({force:true}).should('be.checked')

        //cy.get('[type="checkbox"]').eq(1).click('force:true') //bad approach
    });

    it('Lists and dropdowns ', () => {

        cy.get('nav nb-select').click()
        //one specific
        cy.get('.option-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')

        //iterate through colour schemas
        cy.get('nav nb-select').then(dropDown =>{
            cy.wrap(dropDown).click()
            cy.get('.option-list nb-option').each(element => {
                const itemtext = element.text().trim()
                cy.wrap(element).click()
                cy.wrap(dropDown).should('contain', itemText)
                cy.get('nav nb-select').click


            })
        })


    })

    it.only('UI Tables ', () => {

        //cy.contains('Tables & Data').click()
        //cy.contains('Smart Table').click()
        navigateTo.smartTablePage()

        const age = [20, 30, 40, 200]

        cy.wrap(age).each(age => {
            cy.get('input[placeholder="Age"]').clear().type(age)
            cy.wait(500)
            cy.get('tbody tr').each(row => {
                if (age == 200) {
                    cy.wrap(row).should("contain", 'No data found')
                } else {

                    cy.wrap(row).find('td').eq(6).should("contain", age)
                }

            })
        })


    });
});