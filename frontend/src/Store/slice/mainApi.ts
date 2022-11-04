import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosService from "../axiosService";

const initialState = {
  userId: 1,
  docId: 0,
  isOpenModal: false,
  isDocCreated: false,
};

// API DOC 생성하기
export const setApiDoc: any = createAsyncThunk(
  "mainApi/setApiDoc",
  async (args: any, { rejectWithValue }) => {
    console.log(args);
    try {
      const response = await axiosService.post("api/docs", args);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// API DOC LIST 조회하기
export const getApiDocList: any = createAsyncThunk(
  "mainApi/getDocList",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosService.get("api/docs");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.respone);
    }
  }
);

// API DOC 수정하기
export const updateApiDoc: any = createAsyncThunk(
  "mainApi/updateApiDoc",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosService.put(
        `api/docs/${args.docId}`,
        args.updateDocRequest
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// API DOC 삭제하기
export const deleteApiDoc: any = createAsyncThunk(
  "mainApi/deleteApiDoc",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosService.delete(`api/docs/${args.docId}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

const mainApiSlice = createSlice({
  name: "mainApi",
  initialState,
  reducers: {
    setDocId(state, action) {
      state.docId = action.payload.docId;
    },
    setIsOpenModal(state, action) {
      state.isOpenModal = action.payload.isOpenModal;
    },
    setIsDocCreated(state, action) {
      state.isDocCreated = action.payload.isDocCreated;
    },
  },
  extraReducers: {
    [setApiDoc.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
      }
    },
    [setApiDoc.rejected]: (state, action) => {
      console.log("setApiDoc rejected", action.payload);
    },
    [getApiDocList.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        console.log("getApiDocList fulfilled", action.payload);
      }
    },
    [getApiDocList.rejected]: (state, action) => {
      console.log("getApiDocList rejected", action.payload);
    },
    [updateApiDoc.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        console.log("updateApiDoc fulfilled", action.payload);
      }
    },
    [updateApiDoc.rejected]: (state, action) => {
      console.log("updateApiDoc rejected", action.payload);
    },
  },
});

export default mainApiSlice;
