import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { subContaState } from "../types/States";

import SubContaSE from "../services/SubContaSE";
import { addValueList, deleteValueList, updateValueList } from "./infosGerais";

const initialState: subContaState = {
  subConta: null ,
  error_subConta: false,
  success_subConta: false,
  loading_subConta: false,
};

export const newSubConta = createAsyncThunk(
  "subConta/NewSubConta",
  async (subConta: { nome: string; tipo: string }, thunkAPI) => {
    thunkAPI.dispatch(
      addValueList({ type: "subConta", value: subConta.nome })
    );

    const data = await SubContaSE.newSubConta(subConta);
    if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      
      return thunkAPI.fulfillWithValue(data.message);
    }
  }
);

export const updateSubConta = createAsyncThunk(
  "subConta/updateSubConta",
  async (
    subConta: { id: number; subContaExistente: string; novaSubConta: string },
    thunkAPI
  ) => {
    thunkAPI.dispatch(
      updateValueList({
        type: "subConta",
        id: subConta.id,
        value: subConta.novaSubConta,
      })
    );

    const data = await SubContaSE.updateSubConta({
      subContaExistente: subConta.subContaExistente,
      novaSubConta: subConta.novaSubConta,
    });
    if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(data.message);
    }
  }
);

export const deleteSubConta = createAsyncThunk(
  "subConta/deleteSubConta",
  async (subConta: { subConta: string; id: number }, thunkAPI) => {
    thunkAPI.dispatch(deleteValueList({ type: "subConta", id: subConta.id }));

    const data = await SubContaSE.deleteSubConta({
      subConta: subConta.subConta,
    });
    if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(data.message);
    }
  }
);

export const SubContaSL = createSlice({
  name: "subContas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newSubConta.pending, (state) => {
        state.error_subConta = false;
        state.loading_subConta = true;
        state.success_subConta = false;
      })
      .addCase(newSubConta.fulfilled, (state, action) => {
        state.error_subConta = false;
        state.success_subConta = action.payload as string;
        state.loading_subConta = false;
      })
      .addCase(newSubConta.rejected, (state, action) => {
        state.error_subConta = action.payload as string;
        state.success_subConta = false;
        state.loading_subConta = false;
      })
      .addCase(updateSubConta.pending, (state) => {
        state.error_subConta = false;
        state.loading_subConta = true;
        state.success_subConta = false;
      })
      .addCase(updateSubConta.fulfilled, (state, action) => {
        state.error_subConta = false;
        state.success_subConta = action.payload as string;
        state.loading_subConta = false;
      })
      .addCase(updateSubConta.rejected, (state, action) => {
        state.error_subConta = action.payload as string;
        state.success_subConta = false;
        state.loading_subConta = false;
      })
      .addCase(deleteSubConta.pending, (state) => {
        state.error_subConta = false;
        state.loading_subConta = true;
        state.success_subConta = false;
      })
      .addCase(deleteSubConta.fulfilled, (state, action) => {
        state.error_subConta = false;
        state.success_subConta = action.payload as string;
        state.loading_subConta = false;
      })
      .addCase(deleteSubConta.rejected, (state, action) => {
        state.error_subConta = action.payload as string;
        state.success_subConta = false;
        state.loading_subConta = false;
      });
  },
});

export default SubContaSL.reducer;
