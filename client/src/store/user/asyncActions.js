import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../../api";

export const getCurrent = createAsyncThunk(
  "user/current",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCurrent();
    if (response.err === 1) {
      return rejectWithValue(response);
    }
    return response.userData;
  }
);
export const getUsers = createAsyncThunk(
  "user/users",
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetUsers();
    if (response.err === 1) {
      return rejectWithValue(response);
    }
    return response.userData.rows;
  }
);
