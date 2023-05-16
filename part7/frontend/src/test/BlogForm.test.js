import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "../components/BlogForm";
import userEvent from "@testing-library/user-event";

describe("<BlogFrom/>", () => {
  test("blog form calls the event handler with right details", async () => {
    const newBlog = {
      title: "I luv u",
      author: "Lovey Lovey",
      url: "love.com",
    };
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const { container } = render(<BlogForm createBlog={createBlog} />);

    const titleInput = container.querySelector("#title");
    const authorInput = container.querySelector("#author");
    const urlInput = container.querySelector("#url");
    const createButton = screen.getByText("create");

    await user.type(titleInput, newBlog.title);
    await user.type(urlInput, newBlog.url);
    await user.type(authorInput, newBlog.author);

    await user.click(createButton);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toStrictEqual(newBlog);
  });
});
