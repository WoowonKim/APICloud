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
}

const initialState: initType = {
  getControllerInfomation: 0,
  getApisInfomation: 0,
  getRequest: 0,
  getIsDarkMode: false,
  getRequestBodyInfo: { key: "", value: "" },
  getServerUrl: "",
  getContextUrl: "",
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

// export const testApiRequestInfo:any = createAsyncThunk("testApi/testApiRequestInfo",async(args:any,{rejectWithValue})=>{
//   try{
//     const response = await testAxiosGet()
//   }
// })

const testApiSlice = createSlice({
  name: "testApi",
  initialState,
  reducers: {
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
