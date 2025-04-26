import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authStates } from "../types/States";
import { authModel } from "../types/models/authMO";
import authService from "../services/AuthSE";

const initialState: authStates = {
  auth: localStorage.getItem("clientToken")
    ? localStorage.getItem("clientToken")
    : null,
  success_auth: false,
  error_auth: false,
  loading_auth: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async (user: authModel, thunkAPI) => {
    const data = await authService.login(user);
    if (
      data.http_status_code === 400 ||
      data.http_status_code === 500 ||
      data.http_status_code === 401
    ) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const data = await authService.logout();

  if (data.http_status_code !== 200) {
    return thunkAPI.rejectWithValue(data.message);
  } else if (data.http_status_code === 200) {
    return thunkAPI.fulfillWithValue(data.message);
  }
});

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, thunkAPI) => {
    const data = await authService.forgotPassword(email);

    if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(data.message);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.error_auth = false;
      state.loading_auth = true;
      state.success_auth = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error_auth = action.payload as string;
      state.loading_auth = false;
      state.success_auth = false;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.error_auth = false;
      state.loading_auth = false;
      state.success_auth = true;
      state.auth = localStorage.getItem("clientToken");
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.auth = null;
      state.success_auth = true;
      state.error_auth = false;
    });

    builder.addCase(logout.rejected, (state) => {
      state.success_auth = false;
      state.error_auth = true;
    });

    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.auth = null;
      state.success_auth = action.payload ? action.payload : "";
      state.error_auth = false;
      state.loading_auth = false;
    });
  },
});

export default AuthSlice.reducer;
