import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import RelatoriosSE from "../../services/RelatoriosSE";
import { DreStates } from "../../types/States";
import { DreModel } from "../../types/models/Relatorios/DREMO";

const initialState: DreStates = {
  Dre: [],
  error_Dre: false,
  success_Dre: false,
  loading_Dre: false,
};

export const getDRE = createAsyncThunk(
  "DRE/getDRE",
  async (_, thunkAPI) => {
    const data = await RelatoriosSE.getDRE();
    if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message as string);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(data.data);
    }
  }
);

export const DRESL = createSlice({
  name: "DRE",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getDRE.pending, (state) => {
        state.error_Dre = false;
        state.loading_Dre = true;
        state.success_Dre = false;
      })
      .addCase(getDRE.fulfilled, (state, action) => {
        state.error_Dre = false;
        state.success_Dre = true;
        state.loading_Dre = false;
        state.Dre = action.payload as unknown as DreModel[];
      })
      .addCase(getDRE.rejected, (state, action) => {
        state.error_Dre = action.payload as string;
        state.loading_Dre = false;
        state.success_Dre = false;
      });
  },
});

export default DRESL.reducer;
