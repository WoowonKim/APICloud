import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGet } from "../../util/axiosUtil";
import { RootState } from "../store";

interface userState {
  authenticated: boolean;
  currentUser: any;
  loading: boolean;
}
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await axiosGet("users/me");
    return response.data;
  } catch (err) {
    return err;
  }
});
const initialState: userState = {
  authenticated: false,
  currentUser: null,
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.currentUser = null;
        state.authenticated = false;
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.currentUser = null;
        state.authenticated = false;
        state.loading = true;
      });
  },
});

const { actions, reducer } = userSlice;
export default reducer;
export const {} = actions;
export const selectUser = (state: RootState) => state.user.currentUser;
