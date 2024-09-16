import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPost: null,
  errors: [],
};

export const postReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    addAllPost: (state, action) => {
      state.allPost = action.payload;
    },
    isError: (state, action) => {
      state.errors.push(action.payload);
    },
  },
});

export const { addAllPost, isError } = postReducer.actions;

export default postReducer.reducer;
