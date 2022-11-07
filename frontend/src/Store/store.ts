import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import mainApiSlice from "./slice/mainApi";
import sideApiSlice from "./slice/sideApi";
import testApiSlice from "./slice/testApi";
import testApiTestSlice from "./slice/testApiTest";
import userReducer from "./slice/userSlice";

const reducers = combineReducers({
  user: userReducer,
  mainApi: mainApiSlice.reducer,
  testApi: testApiSlice.reducer,
  sideApi: sideApiSlice.reducer,
  testApiTest: testApiTestSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
