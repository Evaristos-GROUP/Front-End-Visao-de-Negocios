import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fonteArrecadacaoState } from "../types/States";
import FonteArrecadacaoSE from "../services/FonteArrecadacaoSE";
import { addValueList, deleteValueList, updateValueList } from "./infosGerais";


const initialState: fonteArrecadacaoState = {
  fonteArrecadacao: '',
  error_fonteArrecadacao: false,
  success_fonteArrecadacao: false,
  loading_fonteArrecadacao: false,
};


export const newFonteArrecadacao = createAsyncThunk(
  "fonteArrecadacao/NewFonteArrecadacao",
  async (fonteArrecadacao: { fonteArrecadacao: string }, thunkAPI) => {

    const data = await FonteArrecadacaoSE.newFonteArrecadacao(fonteArrecadacao);
    if (data.http_status_code === 200) {
      thunkAPI.dispatch(addValueList({ type: "fonteDeArrecadacao", value: fonteArrecadacao.fonteArrecadacao }));
      thunkAPI.dispatch(resetFonteDeArrecadacaoStates())  
      return thunkAPI.fulfillWithValue(data.message)
    } else if (data.http_status_code !==  200) {
      return thunkAPI.rejectWithValue(data.message);
    }

  }
);


export const updateFonteArrecadacao = createAsyncThunk(
  "fonteArrecadacao/updateFonteArrecadacao",

  async (fonteArrecadacao: { id : number , novafonteArrecadacao: string , fonteArrecadacaoExistente : string }, thunkAPI) => {
    const data = await FonteArrecadacaoSE.updateFonteArrecadacao({novafonteArrecadacao : fonteArrecadacao.novafonteArrecadacao , fonteArrecadacaoExistente :fonteArrecadacao.fonteArrecadacaoExistente });
    if (data.http_status_code === 200) {
      thunkAPI.dispatch(updateValueList({ type: "fonteDeArrecadacao", id: fonteArrecadacao.id, value: fonteArrecadacao.novafonteArrecadacao }));
      thunkAPI.dispatch(resetFonteDeArrecadacaoStates())  
      return thunkAPI.fulfillWithValue(data.message)
    } else if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message);
    }
  }
);


export const deleteFonteArrecadacao = createAsyncThunk(
  "fonteArrecadacao/deleteFonteArrecadacao",
  async (fonteArrecadacao: { fonteArrecadacao: string , id : number }, thunkAPI) => {
    const data = await FonteArrecadacaoSE.deleteFonteArrecadacao({fonteArrecadacao : fonteArrecadacao.fonteArrecadacao});
    if (data.http_status_code === 200) {
    thunkAPI.dispatch(deleteValueList({ type: "fonteDeArrecadacao", id: fonteArrecadacao.id }));
      return thunkAPI.fulfillWithValue(data.message)
    } else if (data.http_status_code !==  200) {
      return thunkAPI.rejectWithValue(data.message);
    }
  }
);


const FonteArrecadacaoSL = createSlice({
  name: "fonteArrecadacao",
  initialState,
  reducers: {

    resetFonteDeArrecadacaoStates: (state) => {
      state.error_fonteArrecadacao = false,
      state.loading_fonteArrecadacao = false,
      state.success_fonteArrecadacao = false
    },


  },
  extraReducers: (builder) => {
    builder

      .addCase(newFonteArrecadacao.pending, (state) => {
        state.error_fonteArrecadacao = false;
        state.success_fonteArrecadacao = false;
        state.loading_fonteArrecadacao = true;
      })
      .addCase(newFonteArrecadacao.fulfilled, (state, action) => {
        state.error_fonteArrecadacao = false;
        if (typeof action.payload === 'string') { state.success_fonteArrecadacao =  action.payload}
        state.loading_fonteArrecadacao = false;
      })
      .addCase(newFonteArrecadacao.rejected, (state, action) => {
        if (typeof action.payload === 'string') state.error_fonteArrecadacao = action.payload;
        state.success_fonteArrecadacao = false;
        state.loading_fonteArrecadacao = false;
      })



      .addCase(updateFonteArrecadacao.pending, (state) => {
        state.error_fonteArrecadacao = false;
        state.success_fonteArrecadacao = false;
        state.loading_fonteArrecadacao = true;
      })
      .addCase(updateFonteArrecadacao.fulfilled, (state, action) => {
        state.error_fonteArrecadacao = false;
        if (typeof action.payload === 'string') { state.success_fonteArrecadacao =  action.payload}
        state.loading_fonteArrecadacao = false;
      })
      .addCase(updateFonteArrecadacao.rejected, (state, action) => {
        if (typeof action.payload === 'string') state.error_fonteArrecadacao = action.payload;
        state.success_fonteArrecadacao = false;
        state.loading_fonteArrecadacao = false;
      })


      
      .addCase(deleteFonteArrecadacao.pending, (state) => {
        state.error_fonteArrecadacao = false;
        state.success_fonteArrecadacao = false;
        state.loading_fonteArrecadacao = true;
      })
      .addCase(deleteFonteArrecadacao.fulfilled, (state, action) => {
        state.error_fonteArrecadacao = false;
        if (typeof action.payload === 'string') { state.success_fonteArrecadacao =  action.payload}
        state.loading_fonteArrecadacao = false;
      })
      .addCase(deleteFonteArrecadacao.rejected, (state, action) => {
        if (typeof action.payload === 'string') state.error_fonteArrecadacao = action.payload;
        state.success_fonteArrecadacao = false;
        state.loading_fonteArrecadacao = false;
      })
  },
});

export const { resetFonteDeArrecadacaoStates } = FonteArrecadacaoSL.actions;
export default FonteArrecadacaoSL.reducer;
