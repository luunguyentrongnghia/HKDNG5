import axios from "../axios";

export const apiCreateProduct = (data) =>
  axios({
    url: "/product/",
    method: "post",
    data,
  });
export const apiGetProducts = (params) =>
  axios({
    url: "/product/",
    method: "get",
    params,
  });
export const apiGetProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "get",
  });
export const apiUpdateProducts = (data, pid) =>
  axios({
    url: "/product/" + pid,
    method: "put",
    data,
  });
export const apiDeleteProduct = (pid) =>
  axios({
    url: "/product/" + pid,
    method: "delete",
  });
