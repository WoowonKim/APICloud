import { combineReducers } from "redux";
import mainApiSlice from "./slice/mainApi";
import testApiSlice from "./slice/testApi";

const rootReducer = combineReducers({
  testApi: testApiSlice.reducer,
  mainApi: mainApiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
