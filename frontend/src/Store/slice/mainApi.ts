import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

const initialState = {
  userId: 1,
};

export const setApiDoc: any = createAsyncThunk(
  "mainApi/setApiDoc",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosService.post("api/docs", args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

const mainApiSlice = createSlice({
  name: "mainApi",
  initialState,
  reducers: {},
  extraReducers: {
    [setApiDoc.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
      }
    },
    [setApiDoc.rejected]: (state, action) => {
      console.log("setApiDoc rejected", action.payload);
    },
  },
});

export default mainApiSlice;
