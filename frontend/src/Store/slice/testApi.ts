import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { axiosGet } from "../../util/axiosUtil";
import { testAxiosGet } from "../../util/tesxAxiosUtil";
import { RootState } from "../store";

type bodyType = {
  key: string;
  value: string;
};

interface initType {
  getControllerInfomation: number;
  getApisInfomation: number;
  getRequest: number;
  getIsDarkMode: boolean;
  getRequestBodyInfo: bodyType;
  getServerUrl: string;
  getContextUrl: string;
  getParams: string;
  getParamsId: string;
  getToken: string;
  getResponseStatus: number;
  getResponseData: any;
  getResponseStatusText: string;
  getResponseErroStatusMessage: string;
  getResponseSuccessHeader: any;
}

const initialState: initType = {
  getControllerInfomation: 0,
  getApisInfomation: 0,
  getRequest: 0,
  getIsDarkMode: false,
  getRequestBodyInfo: { key: "", value: "" },
  getServerUrl: "",
  getContextUrl: "",
  getParams: "",
  getParamsId: "",
  getToken: "",
  getResponseStatus: 0,
  getResponseData: {},
  getResponseStatusText: "",
  getResponseErroStatusMessage: "",
  getResponseSuccessHeader: {},
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
    getSuccessHeader(state, action) {
      state.getResponseSuccessHeader = action.payload;
    },
    getErrMessage(state, action) {
      state.getResponseErroStatusMessage = action.payload;
    },
    getData(state, action) {
      state.getResponseData = action.payload;
    },
    getStatus(state, action) {
      state.getResponseStatus = action.payload;
    },
    getStatusTextInfo(state, action) {
      state.getResponseStatusText = action.payload;
    },
    getTokenInfo(state, action) {
      state.getToken = action.payload;
    },
    getParamsID(state, action) {
      console.log("ID ACION", action.payload);
      state.getParamsId = action.payload;
    },
    getParam(state, action) {
      state.getParams = action.payload;
    },
    getURL(state, action) {
      state.getServerUrl = action.payload;
    },
    getContext(state, action) {
      state.getContextUrl = action.payload;
    },
    setGlobalDarkMode(state, action) {
      console.log("ACTION ->", action.payload);
      state = action.payload;
    },
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
