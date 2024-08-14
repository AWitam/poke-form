/// <reference types="cypress" />

Cypress.Commands.add("fillTrainerForm", (trainerName, trainerAge, query) => {
  cy.get('input[name="trainerName"]').type(trainerName);
  cy.get('input[name="trainerAge"]').type(trainerAge);
  cy.get("#pokemon-name").click();
  cy.focused().type(query);
});

Cypress.Commands.add("selectMatch", (match) => {
  cy.contains(match).should("be.visible").click();
});

Cypress.Commands.add("checkSuccessDialog", (successMessage, resetMessage) => {
  cy.get('div[role="presentation"]').should("be.visible");
  cy.contains(successMessage).should("be.visible");
  cy.contains(resetMessage).should("be.visible");
});

Cypress.Commands.add("verifyResetFormValues", () => {
  cy.get('input[name="trainerName"]').should("have.value", "");
  cy.get('input[name="trainerAge"]').should("have.value", "");
  cy.get("#pokemon-name").should("have.value", "");
});

declare global {
  namespace Cypress {
    interface Chainable {
      fillTrainerForm(
        trainerName: string,
        trainerAge: string,
        pokemonName: string
      ): Chainable<void>;
      checkSuccessDialog(
        successMessage: string,
        resetMessage: string
      ): Chainable<void>;
      selectMatch(match: string): Chainable<void>;
      verifyResetFormValues(): Chainable<void>;
    }
  }
}

export {};
