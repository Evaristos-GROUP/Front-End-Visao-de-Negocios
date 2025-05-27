import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { caixaStates } from "../types/States";
import caixaService from "../services/CaixaSE";

const initialState: caixaStates = {
  success_caixa: false,
  error_caixa: false,
  loading_caixa: false,
};

export const patchInitCaixa = createAsyncThunk(
  "caixa/initCaixa",
  async (caixaInicial: number) => {
    const data = await caixaService.init(caixaInicial);
    return data;
  }
);

export const CaixaSlice = createSlice({
  name: "caixa",
  initialState,
  reducers: {
    resetStatesCaixa: (state) => {
      state.loading_caixa = false;
      state.success_caixa = false;
      state.error_caixa = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(patchInitCaixa.pending, (state) => {
      state.error_caixa = false;
      state.loading_caixa = true;
      state.success_caixa = false;
    });
    builder.addCase(patchInitCaixa.rejected, (state) => {
      state.error_caixa = true;
      state.loading_caixa = false;
      state.success_caixa = false;
    });
    builder.addCase(patchInitCaixa.fulfilled, (state) => {
      state.error_caixa = false;
      state.loading_caixa = false;
      state.success_caixa = true;
    });
  },
});

export const { resetStatesCaixa } = CaixaSlice.actions;
export default CaixaSlice.reducer;
