import axios from "@/utils/axios";
import {
  addUser,
  removeError,
  removeUser,
  post,
  savedPosts,
  isError,
} from "../Reducers/userReducers";
import { toast } from "react-toastify";
export const asyncCurrentUser = () => async (dispatch, getstate) => {
  try {
    const { data } = await axios.get("/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!data) {
      dispatch(removeUser());
      localStorage.removeItem("token");
      return;
    }
    console.log(data);
    dispatch(addUser(data));
  } catch (error) {
    toast.error("Login to access resources");
    console.log(error.response.data.message || error);
  }
};

export const asyncSignupUser = (user) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/user/signup", user);
    console.log(data);
    localStorage.setItem("token", data.token);
    dispatch(asyncCurrentUser());
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(isError(error.response.data.message));
  }
};

export const asyncSigninUser = (user) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/user/signin", user);
    localStorage.setItem("token", data.token);
    dispatch(asyncCurrentUser());
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch(isError(error.response.data.message));
  }
};

export const asyncSignoutUser = (user) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/user/signout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(data);
    localStorage.removeItem("token");
    dispatch(removeUser());
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error.response.data.message || error);
  }
};

export const asyncFollowUser = (id) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/user/follow", id);
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
    // dispatch(isError(error.response.data.message));
  }
};

export const asyncUnFollowUser = (id) => async (dispatch, getstate) => {
  try {
    const { data } = await axios.post("/user/unfollow", id);
    dispatch(asyncCurrentUser());
  } catch (error) {
    console.log(error);
    // dispatch(isError(error.response.data.message));
  }
};

// export const asyncupdateuser = (user) => async (dispatch, getstate) => {
//   try {
//     const { _id } = getstate().userReducer.user;
//     const { data } = await axios.post(`/user/update/${_id}`, user);
//     // const { data } = await axios.post(`/user/update/`+_id,user);
//     dispatch(asynccurrentuser());
//   } catch (error) {
//     dispatch(iserror(error.response.data.message));
//   }
// };

// export const asyncavataruser = (user) => async (dispatch, getstate) => {
//   try {
//     const { _id } = getstate().userReducer.user;
//     const { data } = await axios.post(`/user/avatar/${_id}`, user);
//     // const { data } = await axios.post(`/user/avatar/`+_id,user);
//     dispatch(asynccurrentuser());
//   } catch (error) {
//     dispatch(iserror(error.response.data.message));
//   }
// };

// export const asyncresetpassworduser =
//   (password) => async (dispatch, getstate) => {
//     try {
//       const { _id } = getstate().userReducer.user;
//       const { data } = await axios.post(
//         `/user/reset-password/${_id}`,
//         password
//       );
//       dispatch(asynccurrentuser());
//     } catch (error) {
//       dispatch(iserror(error.response.data.message));
//     }
//   };

// export const asyncforgetpassworduser =
//   (email) => async (dispatch, getstate) => {
//     try {
//       const { data } = await axios.post(`/user/send-mail`, email);
//       console.log(email);
//       dispatch(asynccurrentuser());
//     } catch (error) {
//       //  dispatch(iserror(error.response.data.message))
//     }
//   };

// export const asyncotppassworduser = (pwd) => async (dispatch, getstate) => {
//   try {
//     const { data } = await axios.post(`/user/forget-link`, pwd);
//     dispatch(asynccurrentuser());
//   } catch (error) {
//     dispatch(iserror(error.response.data.message));
//   }
// };
