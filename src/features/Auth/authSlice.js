import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {}, loading: false, error: "" },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = authSlice;
export const { setUser } = actions;
export default reducer;
