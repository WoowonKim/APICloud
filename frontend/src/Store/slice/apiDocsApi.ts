import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { axiosGet, axiosGetFile, axiosPost } from "../../util/axiosUtil";

const initialState = {
  isOpenExtractModal: false,
  isOpenDependencyModal: false,
};

// 특정 API DOC Detail 조회하기
export const getApiDetail: any = createAsyncThunk(
  "apiDocsApi/getApiDetail",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosGet(`apis/${args.docId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// csv 파일 다운로드
export const getCsv: any = createAsyncThunk(
  "apiDocsApi/getCsv",
  async (args: any, { rejectWithValue }) => {
    try {
      // TODO: 현재 detail 전달
      const response = await axiosGetFile(`docs/${args.docId}/csv`);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// spring boot 파일 다운로드
export const getSpringBoot: any = createAsyncThunk(
  "apiDocsApi/getSpringBoot",
  async (args: any, { rejectWithValue }) => {
    try {
      // TODO: 현재 detail, dependencies 전달
      const response = await axiosGetFile(`docs/${args.docId}/project`);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// notion 추출
export const getNotion: any = createAsyncThunk(
  "apiDocsApi/getNotion",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosPost(
        `docs/${args.docId}/notion`,
        args.notionRequest
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

const apiDocsApiSlice = createSlice({
  name: "mainApi",
  initialState,
  reducers: {
    setIsOpenExtractModal(state, action) {
      state.isOpenExtractModal = action.payload.isOpenExtractModal;
    },
    setIsOpenDependencyModal(state, action) {
      state.isOpenDependencyModal = action.payload.isOpenDependencyModal;
    },
  },
  extraReducers: {
    [getApiDetail.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [getApiDetail.rejected]: (state, action) => {
      console.log("getApiDetail rejected", action.payload);
    },
    [getCsv.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [getCsv.rejected]: (state, action) => {
      console.log("getCsv rejected", action.payload);
    },
  },
});

export default apiDocsApiSlice;
