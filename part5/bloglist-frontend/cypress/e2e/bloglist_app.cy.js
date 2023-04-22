describe("template spec", () => {

  const user = {
    username: "hola",
    name: "Helasto Damicria",
    password: "123456",
  };

  const users = [
    user,
    {
      username: "Nhi",
      name: "Hailey LyLy",
      password: "123456"
    }
  ];

  beforeEach(function() {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    users.forEach(user => {
      cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    });
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

    const blogs = [
      { title: "Des", author: "Dest Tit", url: "dest.com", likes: 10 },
      { title: "Ash", author: "Ashig Giga", url: "ash.com" },
      { title: "Gigas", author: "Gesto Manifesto", url: "giga.com" }
    ];
    beforeEach(() => {
      cy.login(users[1].username, users[1].password);
      cy.createBlog(blog);
      cy.contains("logout").click();
      cy.login(user.username, user.password);
      blogs.forEach(blog => cy.createBlog(blog));
    });

    it("A blog can be created", function() {
      cy.contains("new blog").click();
      cy.get("#title").type(blog.title);
      cy.get("#author").type(blog.author);
      cy.get("#url").type(blog.url);
      cy.get("#blog-btn").click();
      cy.contains(`${blog.title} ${blog.author}`);
    });

    it("A user can like a blog", function() {
      cy.contains(`${blogs[0].title} ${blogs[0].author}`).as("theBlog");
      cy.get("@theBlog").contains("view").click();
      cy.get("@theBlog").contains("like").click();
      cy.get("@theBlog").should("contain", `${blogs[0].likes + 1}`);
    });

    it("The user who created a blog can delete it", function() {
      cy.contains(`${blogs[0].title} ${blogs[0].author}`).as("theBlog");
      cy.get("@theBlog").contains("view").click();
      cy.get("@theBlog").contains("remove").click();
      cy.get("@theBlog").should("not.exist");
    });

    it("Only creater can see the remove button of the blog", function() {
      cy.contains(`${blog.title} ${blog.author}`).as("theBlog");
      cy.get("@theBlog").contains("view").click();
      cy.get("@theBlog").should("not.contain", "remove");
    });
  });
});