import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { axiosGet } from "../../util/axiosUtil";

const initialState = {};

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

const apiDocsApiSlice = createSlice({
  name: "mainApi",
  initialState,
  reducers: {},
  extraReducers: {
    [getApiDetail.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
      }
    },
    [getApiDetail.rejected]: (state, action) => {
      console.log("getApiDetail rejected", action.payload);
    },
  },
});

export default apiDocsApiSlice;
