import axios from "../axios";

export const apiCreateShop = (data) =>
  axios({
    url: "/shop/",
    method: "post",
    data,
  });
export const apiGetShops = (params) =>
  axios({
    url: "/shop/",
    method: "get",
    params,
  });
export const apiDeleteshop = (sid) =>
  axios({
    url: "/shop/" + sid,
    method: "delete",
  });
export const apiUpdateStatusShop = (data, sid) =>
  axios({
    url: "/shop/updateStatusShop/" + sid,
    method: "put",
    data,
  });
export const apiUpdateShop = (data, sid) =>
  axios({
    url: "/shop/" + sid,
    method: "put",
    data,
  });
