import {onFormLayoutsPage} from "../support/page_objects/formLayoutsPage";
import {navigateTo} from "../support/page_objects/navigationPages";

describe('Tapost: test', {retries:2},() => {

    beforeEach('Open Tapost Angular app home page', () => {
        cy.visit("https://tapost.fly.dev/")
    })

    it('Submit online form with name and email', () =>{
        //calls function from formLayoutsPage.ts
        navigateTo.formLayoutsPage()
        // cy.fixture('userData.json').as('userData')
        // cy.get('@userData').then(data => {
        //     onFormLayoutsPage
        //         .submitInLineFormWithNameAndEmail(data.fullName, data.email)
        // })

        //onFormLayoutsPage.submitInLineFormWithNameAndEmail('Ieva Age', 'mail@mail.com')
        onFormLayoutsPage.submitInLineFormWithNameAndEmail(Cypress.env('fullName'), Cypress.env('email'))

    });
    })