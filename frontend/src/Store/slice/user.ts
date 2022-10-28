import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  currentUser: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default userSlice;
