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

  test("update new state with action blogs/updateBlog", () => {
    const state = [
      {
        id: 1,
        title: "test",
        author: "test",
        likes: 1,
      },
      {
        id: 2,
        title: "test",
        author: "test",
        likes: 2,
      },
    ];
    const action = {
      type: "blogs/modifyBlog",
      payload: {
        id: 2,
        blog: {
          id: 2,
          title: "test",
          author: "test",
          likes: 3,
        },
      },
    };

    deepFreeze(state);
    const newState = blogsReducer(state, action);
    expect(newState).toHaveLength(state.length);
    expect(newState).toContainEqual(action.payload.blog);
  });
  test("get new state with action blogs/removeBlog", () => {
    const state = [
      {
        id: 1,
        title: "test",
        author: "test",
        likes: 1,
      },
      {
        id: 2,
        title: "test",
        author: "test",
        likes: 2,
      },
    ];
    const action = {
      type: "blogs/removeBlog",
      payload: 2,
    };

    deepFreeze(state);
    const newState = blogsReducer(state, action);
    expect(newState).toHaveLength(state.length - 1);
    expect(newState).not.toContainEqual(state[1]);
  });
});
