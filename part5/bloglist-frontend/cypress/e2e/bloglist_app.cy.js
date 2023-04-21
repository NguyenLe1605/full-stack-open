describe("template spec", () => {

  const user = {
    username: "hola",
    name: "Helasto Damicria",
    password: "123456",
  };

  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");
  });

  it("Login form is show", () => {
    cy.contains("log in to the application");
    cy.get(".login-form")
      .should("contain", "username")
      .and("contain", "password")
      .and("contain", "login");
  });

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.contains("login").click();
      cy.contains(`${user.name} logged in to the application`);
    });

    it("fails with wrong credentials", function() {
      cy.get("#username").type("wtf");
      cy.get("#password").type("wtf");
      cy.contains("login").click();
      cy.get(".notification")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function() {
    const blog = {
      title: "blah",
      author: "Demi Blah",
      url: "blah.com"
    };
    beforeEach(() => {
      cy.login(user.username, user.password);
    });

    it("A blog can be created", function() {
      cy.contains("new blog").click();
      cy.get("#title").type(blog.title);
      cy.get("#author").type(blog.author);
      cy.get("#url").type(blog.url);
      cy.get("#blog-btn").click();
      cy.contains(`${blog.title} ${blog.author}`);
    });
  });
});