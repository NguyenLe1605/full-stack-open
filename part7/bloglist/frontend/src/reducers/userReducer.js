import { createSlice } from "@reduxjs/toolkit";
import storageService from "../services/storage";
import loginService from "../services/login";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

export const loadUser = () => {
  return (dispatch) => {
    const user = storageService.loadUser();
    dispatch(setUser(user));
  };
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const response = await loginService.login({ username, password });
    storageService.saveUser(response);
    await dispatch(setUser(response));
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    storageService.removeUser();
    dispatch(setUser(null));
  };
};
