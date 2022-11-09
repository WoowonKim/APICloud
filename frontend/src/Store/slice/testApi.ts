import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { axiosGet } from "../../util/axiosUtil";
import { RootState } from "../store";

/**
 * header.contentType => controllers.headers.value
 */

const initialState = {
  getControllerInfomation: 0,
  getApisInfomation: 0,
  getRequest: 0,
};

// API 조회 하기.
export const getApiRequestInfo: any = createAsyncThunk("testApi/getApiRequestInfo", async (args: any, { rejectWithValue }) => {
  try {
    const response = await axiosGet(`apis/${args.docId}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response);
  }
});

const testApiSlice = createSlice({
  name: "testApi",
  initialState,
  reducers: {
    addController(state, action) {
      state.getControllerInfomation = action.payload;
    },
    addApis(state, action) {
      state.getApisInfomation = action.payload;
    },
    addRequest(state, action) {
      state.getRequest = action.payload;
    },
  },
  extraReducers: {
    [getApiRequestInfo.fulfilled]: (state, action) => {
      console.log("GetApiRequestInfo Success =>");
    },
    [getApiRequestInfo.rejected]: (state, action) => {
      console.log("GetApiRequestInfoRejected => ", action.payload);
    },
  },
});

export default testApiSlice;
export const selectTestApi = (state: RootState) => state.testApi;
