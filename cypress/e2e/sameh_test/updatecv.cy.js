describe("updatecv", () => {
  it("update cv", () => {
    cy.loginAsAlumni("camorraleader14@gmail.com", "1234567");
    cy.get("a#Update_CV.link").click();
    cy.wait(2000);
    cy.location("pathname").should("eq", "/UpdateCV");

    cy.get('input[name="linkedInUrl"]')
      .clear()
      .type("https://www.linkedin.com/new-url");
    cy.get('input[name="githubUrl"]')
      .clear()
      .type("https://www.github.com/new-url");
    cy.get('textarea[name="description"]').clear().eq(0).type("New biography");
    cy.get('select[name="type_cv"]').select("Dark theme CV");
    /* cy.get('button:contains("Add new Experience")').click();
    cy.get('input[name="titre"]').last().clear().type("New Experience Title");
    cy.get('input[name="technologies"]').last().clear().type("React, Cypress");
    cy.get('textarea[name="description"]')
      .last()
      .clear()
      .eq(0)
      .type("New experience description");
    cy.get('input[name="nom_societe"]').last().clear().type("New Company");
    cy.get('select[name="type_exp"]').last().select("Vie professionnelle");
    cy.get('input[name="emplacement"]').last().clear().type("New Location");
    cy.get('input[name="dateDebut"]').last().clear().type("2022-01-01");
    cy.get('input[name="dateFin"]').last().clear().type("2023-01-01");
    cy.contains("button", "Add new Experience").click();
    // Fill in the details for the second experience
    cy.get('input[name="titre"]').eq(1).type("Experience 2");
    cy.get('input[name="technologies"]').eq(1).type("Technology 2");
    cy.get('textarea[name="description"]').eq(1).type("Description 2");
    cy.get('input[name="nom_societe"]').eq(1).type("Company 2");
    cy.get('select[name="type_exp"]').eq(1).select("Stage d'été");
    cy.get('input[name="emplacement"]').eq(1).type("Location 2");
    cy.get('input[name="dateDebut"]').eq(1).type("2023-01-01");
    cy.get('input[name="dateFin"]').eq(1).type("2023-06-30");*/

    // Fill in the details for the first experience
    cy.get('input[name="titre"]').clear().eq(0).type("Experience 1");
    cy.get('input[name="technologies"]').clear().eq(0).type("Technology 1");
    cy.get('textarea[name="description"]').clear().eq(0).type("Description 1");
    cy.get('input[name="nom_societe"]').clear().eq(0).type("Company 1");
    cy.get('select[name="type_exp"]').eq(0).select("PFE");
    cy.get('input[name="emplacement"]').eq(0).type("Location 1");
    cy.get('input[name="dateDebut"]').eq(0).type("2022-01-01");
    cy.get('input[name="dateFin"]').eq(0).type("2022-12-31");

    // Click the "Add new Experience" button again to add a second experience
    cy.contains("button", "Add new Experience").click();

    // Fill in the details for the second experience
    cy.get('input[name="titre"]').eq(1).type("Experience 2");
    cy.get('input[name="technologies"]').eq(1).type("Technology 2");
    cy.get('textarea[name="description"]').eq(1).type("Description 2");
    cy.get('input[name="nom_societe"]').eq(1).type("Company 2");
    cy.get('select[name="type_exp"]').eq(1).select("STAGE D'ETE");
    cy.get('input[name="emplacement"]').eq(1).type("Location 2");
    cy.get('input[name="dateDebut"]').eq(1).type("2023-01-01");
    cy.get('input[name="dateFin"]').eq(1).type("2023-06-30");

    // Click the "Delete" button for the first experience
    cy.get("button").contains("Delete").first().click();
    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    cy.location("pathname").should("eq", "/MainCv");
    cy.contains("https://www.linkedin.com/new-url");
    cy.contains("https://www.github.com/new-url");
    /*cy.contains("New biography");
    cy.contains("Experience 1");
    cy.contains("Technology 1");
    cy.contains("Description 1");
    cy.contains("Company 1");
    cy.contains("PFE");
    cy.contains("Location 1");
    cy.contains("2022-01-01");
    cy.contains("2022-12-31");*/
    cy.contains("Experience 2");
    cy.contains("Technology 2");
    //cy.contains("Description 2");
    cy.contains("Company 2");
    cy.contains("STAGE D'ETE");
    cy.contains("Location 2");
    cy.contains("2023-01-01");
    cy.contains("2023-06-30");
  });
});
