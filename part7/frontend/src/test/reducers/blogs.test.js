import blogsReducer from "../../reducers/blogsReducer";
import deepFreeze from "deep-freeze";

describe("blogsReducer", () => {
  test("return a new state with actions blogs/appendBlog", () => {
    const state = [];
    const action = {
      type: "blogs/appendBlog",
      payload: {
        title: "test",
        author: "test",
        likes: 1,
      },
    };

    deepFreeze(state);
    const newState = blogsReducer(state, action);
    expect(newState).toHaveLength(1);
    expect(newState).toContainEqual(action.payload);
  });

  test("set new state with actions blogs/setBlogs", () => {
    const state = [];
    const action = {
      type: "blogs/setBlogs",
      payload: [
        {
          title: "test",
          author: "test",
          likes: 1,
        },
        {
          title: "test",
          author: "test",
          likes: 2,
        },
      ],
    };

    deepFreeze(state);
    const newState = blogsReducer(state, action);
    expect(newState).toHaveLength(action.payload.length);
    expect([...newState].sort()).toEqual([...action.payload].sort());
  });
});
