import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { infosGeraisStates } from "../types/States";
import dashboardService from "../services/DashboardSE";
import { informacoesGeraisParaOFrontModel } from "../types/models/infosGeraisMO";

const initialState: infosGeraisStates = {
  infosGerais: undefined,
  success_infoGerais: false,
  error_infoGerais: false,
  loading_infoGerais: false,
};

export const getInfosGerais = createAsyncThunk(
  "infosGerais/getInfosGerais",
  async (param: string, thunkAPI) => {
    const data = await dashboardService.getDashboard(param);
    if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(
        (data.data as unknown[])[0] as informacoesGeraisParaOFrontModel
      );
    }
  }
);

export const infosGeraisSlice = createSlice({
  name: "infosGerais",
  initialState,
  reducers: {
    addValueList: (state, action) => {
      const { type, value } = action.payload;

      if (type === "subConta" && value) {
        state.infosGerais!.sub_contas.push(value);
      } else if (type === "fonteDeArrecadacao" && value) {
        state.infosGerais!.fonte_arrecadacoes.push(value);
      } else {
        console.error("Erro: Tipo ou valor inválido.");
      }
    },

    updateValueList: (state, action) => {
      const { type, id, value } = action.payload;

      console.log(action.payload);

      if (type === "subConta" && id !== undefined && value) {
        state.infosGerais!.sub_contas = state.infosGerais!.sub_contas.map(
          (item, index) => (index === id ? value : item)
        );
      } else if (type === "fonteDeArrecadacao" && id !== undefined && value) {
        state.infosGerais!.fonte_arrecadacoes =
          state.infosGerais!.fonte_arrecadacoes.map((item, index) =>
            index === id ? value : item
          );
      } else {
        console.error(
          "Erro: Não foi possível atualizar. Payload incompleto ou inválido."
        );
      }
    },

    deleteValueList: (state, action) => {
      const { type, id } = action.payload;

      if (type === "subConta" && id !== undefined) {
        state.infosGerais!.sub_contas = state.infosGerais!.sub_contas.filter(
          (_, index) => index !== id
        );
      } else if (type === "fonteDeArrecadacao" && id !== undefined) {
        state.infosGerais!.fonte_arrecadacoes =
          state.infosGerais!.fonte_arrecadacoes.filter(
            (_, index) => index !== id
          );
      } else {
        console.error(
          "Erro: Não foi possível excluir. Índice ou tipo inválido."
        );
      }
    },

    setValuesList: (state, action) => {
      const { type, list } = action.payload;

      if (type === "subContas" && Array.isArray(list)) {
        state.infosGerais!.sub_contas = list;
      } else if (type === "fonteDeArrecadacao" && Array.isArray(list)) {
        state.infosGerais!.fonte_arrecadacoes = list;
      } else {
        console.error("Erro: Tipo ou lista inválida.");
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getInfosGerais.pending, (state) => {
      state.error_infoGerais = false;
      state.loading_infoGerais = true;
      state.success_infoGerais = false;
    });
    builder.addCase(getInfosGerais.rejected, (state, action) => {
      state.error_infoGerais = action.payload as string;
      state.loading_infoGerais = false;
      state.success_infoGerais = false;
    });
    builder.addCase(getInfosGerais.fulfilled, (state, action) => {
      state.error_infoGerais = false;
      state.loading_infoGerais = false;
      state.success_infoGerais = true;
      state.infosGerais = action.payload;
    });
  },
});
export const { addValueList, updateValueList, deleteValueList, setValuesList } =
  infosGeraisSlice.actions;
export default infosGeraisSlice.reducer;
