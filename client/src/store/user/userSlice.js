import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    isLoading: false,
    mess: "",
    usersData: [],
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.current = null;
      state.token = null;
      state.isLoading = false;
      state.mess = "";
    },
    clearMessage: (state, action) => {
      state.mess = "";
    },
    updateCart: (state, action) => {},
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.getCurrent.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder
      .addCase(actions.getCurrent.fulfilled, (state, action) => {
        // Tắt trạng thái loading, lưu thông tin user vào store
        state.isLoading = false;
        state.current = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(actions.getUsers.fulfilled, (state, action) => {
        // Tắt trạng thái loading, lưu thông tin user vào store

        state.usersData = action.payload;
      });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
      state.mess = "phiên đăng nhập đã hết hạn ,Hãy đăng nhập lại! ";
    });
  },
});
export const { login, logout, clearMessage } = userSlice.actions;
export default userSlice.reducer;
