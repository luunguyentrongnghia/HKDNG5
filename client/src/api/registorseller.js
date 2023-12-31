import axios from "../axios";

export const apiCreateRegistorSeller = (data) =>
  axios({
    url: "/registorseller/",
    method: "post",
    data,
  });
export const apiGetRegistorSellers = (params) =>
  axios({
    url: "/registorseller/",
    method: "get",
    params,
  });
export const apiDeleteRegistorSellers = (rsid) =>
  axios({
    url: "/registorseller/" + rsid,
    method: "delete",
  });
