import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import topMenuReducer from "./topMenuSlice";

export const store = configureStore({
  reducer: {
    topMenu: topMenuReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
