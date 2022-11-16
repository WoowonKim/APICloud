import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  axiosGet,
  axiosGetFile,
  axiosPost,
  axiosPostFile,
  axiosPut,
} from "../../util/axiosUtil";

const initialState = {
  isOpenExtractModal: false,
  isOpenDependencyModal: false,
  isPending: false,
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
      const response = await axiosGetFile(`docs/${args.encryptedUrl}/csv`);
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
      const response = await axiosPostFile(
        `docs/${args.encryptedUrl}/project`,
        args.springExtractRequest
      );
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
        `docs/${args.encryptedUrl}/notion`,
        args.notionRequest
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// FIXME: detail 임시 업데이트
export const setApiDetail: any = createAsyncThunk(
  "apiDocsApi/setApiDetail",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosPut(
        `apis/enc/${args.encryptedUrl}`,
        args.detailRequest
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 사용자의 프로젝트 파일에서 변경된 값 조회
export const getSynchronizeFile: any = createAsyncThunk(
  "apiDocsApi/getSynchronizeFile",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosPost(
        `synchronize/${args.docId}`,
        args.formData
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 사용자의 프로젝트 파일에서 변경된 값으로 db update
export const updateSynchronizeData: any = createAsyncThunk(
  "apiDocsApi/updateSynchronizeData",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosPut(`synchronize/${args.docId}`, {
        controllerId: args.controllerId,
        controllerDTO: args.controllerDTO,
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// api 명세를 파일로 변환
export const getSynchronizeApiDoc: any = createAsyncThunk(
  "apiDocsApi/getSynchronizeApiDoc",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosPost(
        `synchronize/doc/${args.docId}`,
        args.detailRequest
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// notion 연동
export const connectNotion: any = createAsyncThunk(
  "apiDocsApi/connectNotion",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosGet(`docs/notion/oauth/${args.code}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

// 문서 권한 확인
export const checkAuthority: any = createAsyncThunk(
  "apiDocsApi/checkAuthority",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await axiosGet(`/docs/authority/${args.encryptedUrl}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response);
    }
  }
);

const apiDocsApiSlice = createSlice({
  name: "apiDocsApi",
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
    [getSpringBoot.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [getSpringBoot.rejected]: (state, action) => {
      console.log("getSpringBoot rejected", action.payload);
    },
    [getNotion.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [getNotion.rejected]: (state, action) => {
      console.log("getNotion rejected", action.payload);
    },
    [setApiDetail.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [setApiDetail.rejected]: (state, action) => {
      console.log("setApiDetail rejected", action.payload);
    },
    [getSynchronizeFile.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [getSynchronizeFile.rejected]: (state, action) => {
      console.log("getSynchronizeFile rejected", action.payload);
    },
    [updateSynchronizeData.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [updateSynchronizeData.rejected]: (state, action) => {
      console.log("updateSynchronizeData rejected", action.payload);
    },
    [getSynchronizeApiDoc.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [getSynchronizeApiDoc.rejected]: (state, action) => {
      console.log("getSynchronizeApiDoc rejected", action.payload);
    },
    [connectNotion.fulfilled]: (state, action) => {
      if (action.meta.requestStatus === "fulfilled") {
      }
    },
    [connectNotion.rejected]: (state, action) => {
      console.log("connectNotion rejected", action.payload);
    },
    [checkAuthority.pending]: (state, action) => {
      state.isPending = true;
    },
    [checkAuthority.fulfilled]: (state, action) => {
      state.isPending = false;
    },
    [checkAuthority.rejected]: (state, action) => {
      state.isPending = false;
      console.log("connectNotion rejected", action.payload);
    },
  },
});

export default apiDocsApiSlice;
