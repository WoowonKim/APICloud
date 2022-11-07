import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { RootState } from "../store";
const initialState = {
  server: {
    dependencies: [],
  },
  controllers: [
    {
      name: "",
      commonUri: "",
      apis: [
        {
          name: "",
          uri: "https://localhost:8080/ApiCloud/",
          method: "GET",
          requestBody: {
            dtoName: "",
            name: "",
            type: " ",
            collectionType: "",
            properties: [
              {
                dtoName: "sss",
                name: "email",
                type: "obect",
                collectionType: "", // List, Map, Set
                properties: [],
                required: true,
              },
            ],
            required: true,
          },
          parameters: [
            {
              dtoName: "sss",
              name: "email",
              type: "obect",
              collectionType: "", // List, Map, Set
              properties: [],
              required: true,
            },
          ],
          queries: [
            {
              dtoName: "sss",
              name: "email",
              type: "obect",
              collectionType: "", // List, Map, Set
              properties: [],
              required: true,
            },
          ],
          headers: [
            {
              contentType: "application/json",
              contentLength: "calculated when request is sent",
              Host: "calculated when request is sent",
              Accept: "*/*",
              AcceptEncoding: "gzip, deflate, br",
              Connection: "keep-alive",
              Token: "",
              Cookie: "",
            },
          ],
        },
      ],
    },
  ],
};

const testApiTestSlice = createSlice({
  name: "testApiTest",
  initialState,
  reducers: {
    setUserAddress(state, action) {
      state.controllers[0].apis[0].uri = action.payload.uri;
      console.log("PayLoad", action.payload);
    },
  },
  extraReducers: {},
});

export default testApiTestSlice;
export const selectTestApiTest = (state: RootState) => state.testApiTest;
