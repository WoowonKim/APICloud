import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import apiDocsApiSlice from "./slice/apiDocsApi";
import mainApiSlice from "./slice/mainApi";
import sideApiSlice from "./slice/sideApi";
import testApiSlice from "./slice/testApi";
import testApiTestSlice from "./slice/testApiTest";
import userSlice from "./slice/userSlice";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const authPersistConfig = {
  key: "user",
  storage,
  whitelist: ["currentUser"],
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userSlice),
  mainApi: mainApiSlice.reducer,
  testApi: testApiSlice.reducer,
  sideApi: sideApiSlice.reducer,
  testApiTest: testApiTestSlice.reducer,
  apiDocsApi: apiDocsApiSlice.reducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
