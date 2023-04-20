describe("template spec", () => {
  it("passes", () => {
    cy.visit("");
    cy.contains("log in to the application");
  });
});