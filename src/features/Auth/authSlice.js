import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService, userService } from "../../services";
import { isObjectEmpty } from "../../utils";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {}, loading: "idle", error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMeThunk.pending, (state, _) => {
        state.loading = "loading";
      })
      .addCase(getMeThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = "idle";
      })
      .addCase(getMeThunk.rejected, (state, action) => {
        if (action.payload === "You are not logged in.") {
          state.user = {};
        }
        state.error = action.payload;
        state.loading = "idle";
      });
  },
});

const getMeThunk = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue, getState }) => {
    const currentUser = authService.auth.currentUser;

    if (currentUser) {
      let res = await userService.checkUser(currentUser.email);

      if (res.length === 0) {
        const user = {
          name: currentUser.displayName,
          email: currentUser.email,
          password: "",
          photoURL: currentUser.photoURL,
        };

        res = await userService.addUser(user);
        return res;
      }

      return res[0];
    } else {
      return rejectWithValue("You are not logged in.");
    }
  }
);

const { reducer } = authSlice;
export { getMeThunk };
export default reducer;
