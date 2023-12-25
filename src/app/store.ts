import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReduser from "./screens/HomePage/slice";
import reduxLogger from "redux-logger";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger), //console.log da ko'rinish u-n kiritdik
  reducer: {
    homePage: HomePageReduser, //redux storemizni homPagega tegishli qismini o'zgartirishga yordam beradi
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
