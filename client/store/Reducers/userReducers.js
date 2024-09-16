import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  post: null,
  savedPosts: null,
  errors: [],
  isAuthenticated: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state, action) => {
      state.student = null;
      state.isAuthenticated = false;
      state.savedPosts = null;
      state.post = null;
      state.errors = [];
    },
    savedPosts: (state, action) => {
      state.savedPosts = action.payload;
    },
    post: (state, action) => {
      state.post = action.payload;
    },
    isError: (state, action) => {
      state.errors.push(action.payload);
    },
    removeError: (state, action) => {
      state.errors = [];
    },
  },
});

export const {addUser,removeError,removeUser,post,savedPosts,isError} = userReducer.actions;

export default userReducer.reducer;
