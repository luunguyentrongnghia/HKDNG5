import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data: data,
    withCredentials: true,
  });
export const apiFinalRegister = (token) =>
  axios({
    url: "/user/finalregister/" + token,
    method: "put",
  });
export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data: data,
    withCredentials: true,
  });
export const apiGetCurrent = () =>
  axios({
    url: "/user/current",
    method: "get",
  });
export const apiForgotPassword = (data) =>
  axios({
    url: "/user/forgotpassword",
    method: "post",
    data: data,
    withCredentials: true,
  });
export const apiResetPassword = (data) =>
  axios({
    url: "/user/resetpassword",
    method: "put",
    data: data,
    withCredentials: true,
  });
export const apiUpdateCurrent = (data) =>
  axios({
    url: "/user/current",
    method: "put",
    data,
  });
export const apiGetUsers = (params) =>
  axios({
    url: "/user/",
    method: "get",
    params,
  });
export const apiUpdateUsers = (data, uid) =>
  axios({
    url: "/user/" + uid,
    method: "put",
    data,
  });
export const apiDeleteUsers = (uid) =>
  axios({
    url: "/user/" + uid,
    method: "delete",
  });
