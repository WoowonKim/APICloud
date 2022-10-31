import { combineReducers } from "redux";
import testApiSlice from "./slice/testApi";

const rootReducer = combineReducers({
  testApi: testApiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
