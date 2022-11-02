import { combineReducers } from "redux";
import sideApiSlice from "./slice/sideApi";
import testApiSlice from "./slice/testApi";

const rootReducer = combineReducers({
  testApi: testApiSlice.reducer,
  sideApit: sideApiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
