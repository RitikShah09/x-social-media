import axios from "@/utils/axios";
import { addAllPost, isError } from "../Reducers/postReducers";
import { toast } from "react-toastify";
import { asyncCurrentUser } from "./userActions";

export const asyncAddPost = () => async (dispatch, getstate) => {
  try {
    const { data } = await axios.get("/post/all-post", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    // console.log(data)
    dispatch(addAllPost(data));
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    dispatch(isError(error.response.data.message));
  }
};

export const asyncCreatePost = (postData) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/post",
      postData
);
    console.log(data)
    dispatch(asyncAddPost());
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
    dispatch(isError(error.response.data.message));
  }
};

export const asyncLikePost = (postId) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.get(`/post/like/${postId}`);
    dispatch(asyncAddPost());
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(isError(error.response.data.message));
  }
};

export const asyncUnLikePost = (postId) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.get(`/post/unlike/${postId}`);
    dispatch(asyncAddPost());
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(isError(error.response.data.message));
  }
};

export const asyncSavePost = (postId) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.get(`/post/save-post/${postId}`);
    dispatch(asyncAddPost());
    dispatch(asyncCurrentUser());
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(isError(error.response.data.message));
  }
};
