import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MargemDeLucroStates } from "../../types/States";
import {
  MargemDeLucroModel,
  servicos,
} from "../../types/models/Relatorios/MargemDeLucroMO";
import TipoServicoSE from "../../services/TipoServicoSE";

const initialState: MargemDeLucroStates = {
  MargemDeLucro: null,
  error_MargemDeLucro: false,
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

    return response.data[0] as unknown as MargemDeLucroModel;
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
    thunkAPI.dispatch(getAllServico());

    if (response.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(response.message);
    }
  }
);

export const updateServico = createAsyncThunk(
  "MargemDeLucro/updateServico",
  async (servico: servicos, thunkAPI) => {
    const response = await TipoServicoSE.updateServico(servico);
    if (response.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response.data as unknown as MargemDeLucroModel;
  }
);

export const deleteServico = createAsyncThunk(
  "MargemDeLucro/deleteServico",
  async (id: number, thunkAPI) => {
    const response = await TipoServicoSE.deleteServico(id);
    if (response.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(response.message);
    }
  }
);

export const MargemDeLucroSL = createSlice({
  name: "MargemDeLucro",
  initialState,
  reducers: {
    resetStatesMargemDeLucro: (state) => {
      state.error_MargemDeLucro = false;
      state.success_MargemDeLucro = false;
      state.loading_MargemDeLucro = false;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(newServico.pending, (state) => {
        state.loading_MargemDeLucro = true;
      })
      .addCase(newServico.fulfilled, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.error_MargemDeLucro = false;
        state.success_MargemDeLucro = action.payload as string;
      })
      .addCase(newServico.rejected, (state, action) => {
        state.loading_MargemDeLucro = false;
        console.log(action.payload);
        state.error_MargemDeLucro = action.payload as string;
      })
      .addCase(updateServico.pending, (state) => {
        state.loading_MargemDeLucro = true;
      })
      .addCase(updateServico.fulfilled, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = true;
        //    state.MargemDeLucro = state.MargemDeLucro.map((item) =>
        //     item.nome === action.payload.nome ? action.payload : item
        //    );
      })
      .addCase(updateServico.rejected, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.error_MargemDeLucro = action.payload as string;
      })
      .addCase(deleteServico.pending, (state) => {
        state.loading_MargemDeLucro = true;
      })
      .addCase(deleteServico.fulfilled, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.success_MargemDeLucro = true;
        //  state.MargemDeLucro = state.MargemDeLucro.filter(
        //     (item) => item.nome !== action.payload.nome
        //);
      })
      .addCase(deleteServico.rejected, (state, action) => {
        state.loading_MargemDeLucro = false;
        state.error_MargemDeLucro = action.payload as string;
      });
  },
});
export const { resetStatesMargemDeLucro } = MargemDeLucroSL.actions;
export default MargemDeLucroSL.reducer;
