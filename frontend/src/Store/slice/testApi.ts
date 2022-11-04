import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { RootState } from "../store";

const initialState = {
  header: {
    contentType: "application/json",
    contentLength: "calculated when request is sent",
    Host: "calculated when request is sent",
    Accept: "*/*",
    AcceptEncoding: "gzip, deflate, br",
    Connection: "keep-alive",
    Token: "",
    Cookie: "",
  },
  infomethod: {
    address: "https://localhost:8080",
    commonUri: "/ApiCloud",
    userAddress: "https://localhost:8080/ApiCloud/",
    method: "GET",
  },
  body: "",
};

const testApiSlice = createSlice({
  name: "testApi",
  initialState,
  reducers: {
    setUserAddress(state, action) {
      state.infomethod.userAddress = action.payload.userAddress;
    },
    setCookie(state, action) {
      state.header.Cookie = action.payload.cookie;
    },
    setAddress(state, action) {
      state.infomethod.address = action.payload.address;
    },
    setBody(state, action) {
      state.body = action.payload.body;
    },
    setMethod(state, action) {
      state.infomethod.method = action.payload.method;
    },
    setToken(state, action) {
      state.header.Token = action.payload.Token;
    },
    setContentType(state, action) {
      state.header.contentType = action.payload.contentType;
    },
    setContentLength(state, action) {
      state.header.contentLength = action.payload.contentLength;
    },
    setHost(state, action) {
      state.header.Host = action.payload.Host;
    },
    setAccept(state, action) {
      state.header.Accept = action.payload.Accept;
    },
    setAcceptEncodng(state, action) {
      state.header.AcceptEncoding = action.payload.AcceptEncoding;
    },
    setConnection(state, action) {
      state.header.Connection = action.payload.Connection;
    },
  },
  extraReducers: {},
});

export default testApiSlice;
export const selectTestApi = (state: RootState) => state.testApi;
