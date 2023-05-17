import userReducer from "../../reducers/userReducer";
import deepFreeze from "deep-freeze";

describe("userReducer", () => {
  test("return a new state with user/setUser", () => {
    const state = {};
    const action = {
      type: "user/setUser",
      payload: {
        token: "secret",
        name: "secret",
        username: "secret",
        password: "secret",
      },
    };

    deepFreeze(state);
    const newState = userReducer(state, action);
    expect(newState).toEqual(action.payload);
  });

  test("return null with user/setUser", () => {
    const state = {};
    const action = {
      type: "user/setUser",
      payload: null,
    };

    deepFreeze(state);
    const newState = userReducer(state, action);
    expect(newState).toBeNull();
  });
});
