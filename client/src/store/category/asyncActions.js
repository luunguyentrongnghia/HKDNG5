import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../api";

export const getNewCategorys = createAsyncThunk(
  "category/newCategory",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategorys();
    if (response.err === 1) {
      return rejectWithValue(response);
    }
    return response.categoryData;
  }
);
