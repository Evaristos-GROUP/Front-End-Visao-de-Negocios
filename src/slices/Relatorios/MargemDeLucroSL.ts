import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MargemDeLucroStates } from "../../types/States";
import {
  MargemDeLucroModel,
  servicos,
} from "../../types/models/Relatorios/MargemDeLucroMO";
import TipoServicoSE from "../../services/TipoServicoSE";

const initialState: MargemDeLucroStates = {
  MargemDeLucro: null,
  error_MargemDeLucro: "",
  success_MargemDeLucro: false,
  loading_MargemDeLucro: false,
};

export const getAllServico = createAsyncThunk(
  "MargemDeLucro/getAllServico",
  async (values: { mes: number; ano: number }, thunkAPI) => {
    const response = await TipoServicoSE.getAllServico(values);

    if (response.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(response.message);
    }

    return (response.data as unknown[])[0] as MargemDeLucroModel;
  }
);

export const newServico = createAsyncThunk(
  "MargemDeLucro/newServico",
  async (servico: { nome: string; tipo: string; date: string }, thunkAPI) => {
    const response = await TipoServicoSE.newTipoServico({
      nomeProcedimento: servico.nome,
      tipoProcedimento: servico.tipo,
      date: servico.date,
    });
    
    if (response.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(response.message);
    }

    return thunkAPI.fulfillWithValue(response.message); 
  }
);

export const updateServico = createAsyncThunk(
  "MargemDeLucro/updateServico",
  async (servico: servicos, thunkAPI) => {
    const response = await TipoServicoSE.updateServico(servico);
    if (response.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.message;
  }
);

export const deleteServico = createAsyncThunk(
  "MargemDeLucro/deleteServico",
  async (id: number, thunkAPI) => {
    const response = await TipoServicoSE.deleteServico(id);
    if (response.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.message; // mesmo esquema
  }
);

export const MargemDeLucroSL = createSlice({
  name: "MargemDeLucro",
  initialState,
  reducers: {
    resetStatesMargemDeLucro: (state) => {
      state.error_MargemDeLucro = "";
      state.success_MargemDeLucro = false;
      state.loading_MargemDeLucro = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Buscar serviços
      .addCase(getAllServico.pending, (state) => {
        state.loading_MargemDeLucro = true;
      })
      .addCase(getAllServico.fulfilled, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = true;
        state.MargemDeLucro = action.payload;
      })
      .addCase(getAllServico.rejected, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = false;
        state.error_MargemDeLucro = action.payload as string;
      })

      // Criar novo serviço
      .addCase(newServico.pending, (state) => {
        state.loading_MargemDeLucro = true;
      })
      .addCase(newServico.fulfilled, (state) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = true;
        state.error_MargemDeLucro = "";
      })
      .addCase(newServico.rejected, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = false;
        state.error_MargemDeLucro = action.payload as string;
      })

      // Atualizar serviço
      .addCase(updateServico.pending, (state) => {
        state.loading_MargemDeLucro = true;
      })
      .addCase(updateServico.fulfilled, (state) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = true;
        state.error_MargemDeLucro = "";
      })
      .addCase(updateServico.rejected, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = false;
        state.error_MargemDeLucro = action.payload as string;
      })


      .addCase(deleteServico.pending, (state) => {
        state.loading_MargemDeLucro = true;
      })
      .addCase(deleteServico.fulfilled, (state) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = true;
        state.error_MargemDeLucro = "";
      })
      .addCase(deleteServico.rejected, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = false;
        state.error_MargemDeLucro = action.payload as string;
      });
  },
});

export const { resetStatesMargemDeLucro } = MargemDeLucroSL.actions;
export default MargemDeLucroSL.reducer;
