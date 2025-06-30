import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aporteRetiradaStates } from "../types/States";


import { aporteRetiradaMO } from "../types/models/aporteRetirada";
import AporteRetiradaSE from "../services/AporteRetiradaSE";

const initialState: aporteRetiradaStates = {
  list_aporteRetirada: [],
  aporteRetiradaMO: null,
  error_aporteRetirada: false,
  success_aporteRetirada: false,
  loading_aporteRetirada: false,
};

export const newAporteRetirada = createAsyncThunk(
  "aporteRetirada/newAporteRetirada",
  async (aporteRetirada: aporteRetiradaMO, thunkAPI) => {
   // thunkAPI.dispatch(addValueList({ type: "subConta", value: subConta.nome }));

    const data = await AporteRetiradaSE.newAporteRetirada(aporteRetirada);
    if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(data.message);
    }
  }
);

export const AporteRetiradaSL = createSlice({
  name: "AporteRetirada",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newAporteRetirada.pending, (state) => {
        state.error_aporteRetirada = false;
        state.loading_aporteRetirada = true;
        state.success_aporteRetirada = false;
      })
      .addCase(newAporteRetirada.fulfilled, (state, action) => {
        state.error_aporteRetirada = false;
        state.success_aporteRetirada = action.payload as string;
        state.loading_aporteRetirada = false;
      })
      .addCase(newAporteRetirada.rejected, (state, action) => {
        state.error_aporteRetirada = action.payload as string;
        state.success_aporteRetirada = false;
        state.loading_aporteRetirada = false;
      })
  },
});

export default AporteRetiradaSL.reducer;
