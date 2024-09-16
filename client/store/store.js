import { configureStore } from "@reduxjs/toolkit";
import user from "./Reducers/userReducers";
import post from './Reducers/postReducers'
export const store = configureStore({
  reducer: {
    user,
    post
  },
});
