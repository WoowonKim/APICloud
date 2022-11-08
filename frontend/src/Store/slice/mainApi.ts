import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { axiosDel, axiosGet, axiosPost, axiosPut } from "../../util/axiosUtil";
import { RootState } from "../store";

const initialState = {
  userId: 1,
  docId: 0,
  isOpenCreateModal: false,
  isOpenUpdateModal: false,
  isDocCreated: false,
  isDocUpdated: false,
};

// API DOC 생성하기
export const setApiDoc: any = createAsyncThunk("mainApi/setApiDoc", async (args: any, { rejectWithValue }) => {
  try {
    const response = await axiosPost("docs", args);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response);
  }
});

// API DOC LIST 조회하기
export const getApiDocList: any = createAsyncThunk("mainApi/getApiDocList", async (args: any, { rejectWithValue }) => {
  try {
    const response = await axiosGet("docs");
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.respone);
  }
});

// 특정 API DOC 조회하기
export const getApiDoc: any = createAsyncThunk("mainApi/getApiDoc", async (args: any, { rejectWithValue }) => {
  try {
    const response = await axiosGet(`docs/${args.docId}`);

    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response);
  }
});

// API DOC 수정하기
export const updateApiDoc: any = createAsyncThunk("mainApi/updateApiDoc", async (args: any, { rejectWithValue }) => {
  try {
    const response = await axiosPut(`docs/${args.docId}`, args.updateDocRequest);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response);
  }
});

// API DOC 삭제하기
export const deleteApiDoc: any = createAsyncThunk("mainApi/deleteApiDoc", async (args: any, { rejectWithValue }) => {
  try {
    const response = await axiosDel(`docs/${args.docId}`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response);
  }
});

// API DOC 생성 정보 조회하기
export const getApiCreationInfo: any = createAsyncThunk("mainApi/getApiCreationInfo", async (args: any, { rejectWithValue }) => {
  try {
    const response = await axiosGet(`metadata/client`);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response);
  }
});

const mainApiSlice = createSlice({
  name: "mainApi",
  initialState,
  reducers: {
    setDocId(state, action) {
      state.docId = action.payload.docId;
    },
    setIsOpenCreateModal(state, action) {
      state.isOpenCreateModal = action.payload.isOpenCreateModal;
    },
    setIsOpenUpdateModal(state, action) {
      state.isOpenUpdateModal = action.payload.isOpenUpdateModal;
    },
    setIsDocCreated(state, action) {
      state.isDocCreated = action.payload.isDocCreated;
    },
    setIsDocUpdated(state, action) {
      state.isDocUpdated = action.payload.isDocUpdated;
    },
  },
  extraReducers: {
    [setApiDoc.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [setApiDoc.rejected]: (state, action) => {
      console.log("setApiDoc rejected", action.payload);
    },
    [getApiDocList.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
        console.log(action.payload);
      }
    },
    [getApiDocList.rejected]: (state, action) => {
      console.log("getApiDocList rejected", action.payload);
    },
    [updateApiDoc.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
        console.log("updateApiDoc fulfilled", action.payload);
      }
    },
    [updateApiDoc.rejected]: (state, action) => {
      console.log("updateApiDoc rejected", action.payload);
    },
    [getApiCreationInfo.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
        console.log("getApiCreationInfo fulfilled", action.payload);
      }
    },
    [getApiCreationInfo.rejected]: (state, action) => {
      console.log("getApiCreationInfo rejected", action.payload);
    },
  },
});

export default mainApiSlice;
export const mainApi = (state: RootState) => state.mainApi;
