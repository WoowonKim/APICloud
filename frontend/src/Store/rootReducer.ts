import { combineReducers } from "redux";
import userSlice from "./slice/user";
import testApiSlice from "./slice/testApi";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  testApi: testApiSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
