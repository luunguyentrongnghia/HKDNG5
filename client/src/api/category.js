import axios from "../axios";

export const apiCreateCategory = (data) =>
  axios({
    url: "/category/",
    method: "post",
    data,
  });
export const apiGetCategorys = (params) =>
  axios({
    url: "/category/",
    method: "get",
    params,
  });
export const apiUpdateCategorys = (data, cid) =>
  axios({
    url: "/category/" + cid,
    method: "put",
    data,
  });
export const apiDeleteCategory = (cid) =>
  axios({
    url: "/category/" + cid,
    method: "delete",
  });
