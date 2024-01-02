import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";

export const categorySlice = createSlice({
  name: "product",
  initialState: {
    newCategorys: null,
    errorMessage: "",
    isLoading: false,
  },
  reducers: {
    // logout: (state) => {
    //   state.isLoading = false;
    // },
  },
  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(actions.getNewCategorys.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(actions.getNewCategorys.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.newCategorys = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(actions.getNewCategorys.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
// export const {} = productSlice.actions;
export default categorySlice.reducer;
