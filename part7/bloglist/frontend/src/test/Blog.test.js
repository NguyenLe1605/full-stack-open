import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Blog />", () => {
  let container;
  const blog = {
    title: "Something",
    author: "Sebas Sebas",
    url: "sebas.com",
    likes: 13,
    user: {
      username: "test",
      name: "Testa Testa",
    },
  };
  beforeEach(() => {
    container = render(
      <Router>
        <Blog blog={blog} />
      </Router>
    ).container;
  });
  test("render only blog's author and title, not url and likes by default", () => {
    screen.getByText("Something Sebas Sebas");
    const blogDetails = container.querySelector(".blogDetails");
    expect(blogDetails).toHaveStyle("display: none");
  });

  test("render url and likes when clicking the button", async () => {
    const viewButton = container.querySelector(".viewButton");
    const user = userEvent.setup();

    await user.click(viewButton);
    const blogDetails = container.querySelector(".blogDetails");
    expect(blogDetails).not.toHaveStyle("display: none");
  });

  test("click the like button twice", async () => {
    const mockLikeHanlder = jest.fn();
    render(
      <Router>
        <Blog blog={blog} handleLikeClick={mockLikeHanlder} />
      </Router>
    );
    const viewButton = container.querySelector(".viewButton");
    const user = userEvent.setup();

    await user.click(viewButton);

    const likeButton = screen.getAllByText("like")[1];
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockLikeHanlder.mock.calls).toHaveLength(2);
  });
});
