import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isError: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const updateNotifcation = (message, isError) => {
  return (dispatch) => {
    dispatch(setNotification({ message, isError }));
    setTimeout(() => {
      dispatch(setNotification(message, false));
    }, 5000);
  };
};

export default notificationSlice.reducer;
