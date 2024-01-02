import { configureStore } from "@reduxjs/toolkit";
// import appSlice from "./app/appSlice";
// import productSlice from "./products/productSlice";
import storage from "redux-persist/lib/storage";
import userSlice from "./user/userSlice";
import categorySlice from "./category/categorySlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

// cấu hình cho redux-persist, bao gồm khóa (key) để xác định nơi lưu trữ dữ liệu và loại lưu trữ (ở đây là local storage)
const commonConfig = {
  key: "shop/user",
  storage,
};
const userConfig = {
  ...commonConfig,
  // Đây là một mảng chứa tên các thuộc tính trong trạng thái của người dùng mà bạn muốn lưu trữ
  whitelist: ["isLoggedIn", "token", "current"],
};
export const store = configureStore({
  reducer: {
    // app: appSlice,
    categorys: categorySlice,
    //persistReducer để tạo một reducer mới cho Redux store Reducer này đã được cấu hình để tự động lưu trạng thái vào lưu trữ và khôi phục nó khi ứng dụng khởi động lại
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefauItMiddeware) =>
    getDefauItMiddeware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, REGISTER],
      },
    }),
});
//persistStore là một hàm được sử dụng để tạo một đối tượng persistor. Đối tượng này được sử dụng để kết hợp Redux store với cơ chế lưu trữ, để bạn có thể lưu trạng thái và khôi phục nó
export const persistor = persistStore(store);
