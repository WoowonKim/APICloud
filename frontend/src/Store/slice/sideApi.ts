import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";

export type SideApiProps = {
  header: {
    contentType: string;
    contentLength: string;
    Host: string;
    Accept: string;
    AcceptEncoding: string;
    Connection: string;
    Token: string;
    Cookie: string;
  };
  infomethod: {
    address: string;
    commonUri: string;
    userAddress: string;
    method: string;
  };
  body: string;
};

const initialState: SideApiProps[] = [];

const sideApiSlice = createSlice({
  name: "sideApi",
  initialState,
  reducers: {
    addMethodUri(state, action) {
      state.push(action.payload);
    },
  },
  extraReducers: {},
});

export default sideApiSlice;
