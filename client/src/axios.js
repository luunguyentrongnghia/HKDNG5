import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});
//xử lý dử liệu trước khi gọi api
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let localStorageData = window.localStorage.getItem("persist:shop/user");
    if (localStorageData && typeof localStorageData === "string") {
      localStorageData = JSON.parse(localStorageData);
      const accessToken = JSON.parse(localStorageData?.token);
      config.headers = { authorization: accessToken };
      return config;
    } else {
      return config;
    }
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// xử lý dử liệu sau khi gọi api
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.response.data;
  }
);
export default instance;
