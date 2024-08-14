describe("Trainer registration form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("on idle", () => {
    it("displays current date", () => {
      const dateRegex = /^[A-Za-z]+, \d{2}\.\d{2}\.\d{4}$/;
      cy.contains(dateRegex).should("be.visible");
    });
  });

  describe("on successful submission", () => {
    it("displays success dialog", () => {
      cy.fixture("formData").then((formData) => {
        const { name, age, query, match } = formData.valid;

        cy.fillTrainerForm(name, age, query);
        cy.selectMatch(match);

        cy.get('button[type="submit"]').click();
        cy.checkSuccessDialog(formData.successMessage, formData.resetMessage);
      });
    });

    it("can reset form values", () => {
      cy.fixture("formData").then((formData) => {
        const { name, age, query, match } = formData.valid;

        cy.fillTrainerForm(name, age, query);
        cy.selectMatch(match);

        cy.get('button[type="submit"]').click();
        cy.checkSuccessDialog(formData.successMessage, formData.resetMessage);

        cy.contains(formData.resetMessage).click();
        cy.verifyResetFormValues();
      });
    });
  });

  describe("on invalid submission", () => {
    it("displays error messages given all inputs are empty", () => {
      cy.fixture("formData").then((formData) => {
        const { name, age, query, match, error } = formData.invalid;
        const { invalidName, invalidAge, invalidPokemon } =
          formData.errorMessageMap;

        cy.get('button[type="submit"]').click();

        cy.contains(invalidAge).should("be.visible");
        cy.contains(invalidName).should("be.visible");
        cy.contains(invalidPokemon).should("be.visible");

        cy.get('div[role="presentation"]').should("not.exist");
      });
    });

    it("displays error messages given invalid name and age inputs", () => {
      cy.fixture("formData").then((formData) => {
        const { name, age, query, match, error } = formData.invalid;
        const { invalidName, invalidAge } = formData.errorMessageMap;

        cy.fillTrainerForm(name, age, query);
        cy.selectMatch(match);

        cy.get('button[type="submit"]').click();

        cy.contains(invalidAge).should("be.visible");
        cy.contains(invalidName).should("be.visible");

        cy.get('div[role="presentation"]').should("not.exist");
      });
    });

    it("displays error message given empty autocomplete value", () => {
      cy.fixture("formData").then((formData) => {
        const { name, age } = formData.valid;
        const { invalidPokemon } = formData.errorMessageMap;

        cy.get('input[name="trainerName"]').type(name);
        cy.get('input[name="trainerAge"]').type(age);

        cy.get('button[type="submit"]').click();

        cy.contains(invalidPokemon).should("be.visible");

        cy.get('div[role="presentation"]').should("not.exist");
      });
    });
  });

  describe("on interaction", () => {
    it("displays pokemon preview on selection", () => {
      cy.fixture("formData").then((formData) => {
        const { name, age, query, match } = formData.valid;

        const expectedAlt = match.toLowerCase();
        const nameRegex = /^Name:.+$/i;
        const typeRegex = /^Type:.+$/i;
        const baseExperienceRegex = /^Base experience:.+$/i;
        const idRegex = /^Id:.+$/i;

        cy.fillTrainerForm(name, age, query);
        cy.selectMatch(match);

        cy.get(`img[alt="${expectedAlt}"]`).should("be.visible");
        cy.contains(nameRegex).should("be.visible");
        cy.contains(typeRegex).should("be.visible");
        cy.contains(baseExperienceRegex).should("be.visible");
        cy.contains(idRegex).should("be.visible");
      });
    });

    it("can clear autocomplete value", () => {
      cy.fixture("formData").then((formData) => {
        const { query, match } = formData.valid;

        cy.get("#pokemon-name").click();
        cy.focused().type(query);
        cy.selectMatch(match);

        cy.get('button[aria-label="Clear"]').click();

        cy.get("#pokemon-name").should("have.value", "");
      });
    });

    it("can reset form values", () => {
      cy.fixture("formData").then((formData) => {
        const { name, age, query, match } = formData.valid;

        cy.fillTrainerForm(name, age, query);

        cy.get('button[type="reset"]').click();
        cy.verifyResetFormValues();
      });
    });
  });
});
