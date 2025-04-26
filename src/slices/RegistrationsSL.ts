import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  vendasStates,
  recebiveisStates,
  despesasStates,
} from "../types/States";
import RegistrationsService from "../services/RegistrationsSE";
import { RootState } from "../store";

interface AppState {
  stateDespesas: despesasStates;
  stateRecebiveis: recebiveisStates;
  stateVendas: vendasStates;
}

const initialState: AppState = {
  stateDespesas: {
    despesas: [],
    error_despesas: false,
    success_despesas: false,
    loading_despesas: false,
  },
  stateRecebiveis: {
    recebiveis: [],
    error_recebiveis: false,
    success_recebiveis: false,
    loading_recebiveis: false,
  },
  stateVendas: {
    vendas: [],
    error_vendas: false,
    success_vendas: false,
    loading_vendas: false,
  },
};

export const newLancamentosAll = createAsyncThunk(
  "registrations/newLancamentosAll",
  async (_, thunkAPI) => {
    const allData = (thunkAPI.getState() as RootState).registrationsStore;

    const formatDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month}-${day}`;
    };

    const convertData = (data: any[]) =>
      data.map((item) => ({
        ...item,
        dataReferencia: formatDate(item.dataReferencia),
      }));

    const res = await RegistrationsService.newLancametosAll(
      convertData(allData.stateRecebiveis.recebiveis),
      convertData(allData.stateDespesas.despesas),
      convertData(allData.stateVendas.vendas)
    );

    if (res.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(res.message);
    }

    return thunkAPI.fulfillWithValue(res.message);
  }
);

export const RegistrationsSlice = createSlice({
  name: "registrations",
  initialState,
  reducers: {
    setImportRecebiveis: (state, action) => {
      state.stateRecebiveis.recebiveis = action.payload;
    },
    setImportVendas: (state, action) => {
      state.stateVendas.vendas = action.payload;
    },
    setImportDespesas: (state, action) => {
      state.stateDespesas.despesas = action.payload;
    },
    updateList: (state, action) => {
      let updatedList;
      if (action.payload.recebivel !== undefined) {
        updatedList = state.stateRecebiveis.recebiveis.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        state.stateRecebiveis.recebiveis = updatedList;
      } else if (action.payload.despesa !== undefined) {
        updatedList = state.stateDespesas.despesas.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        state.stateDespesas.despesas = updatedList;
      } else if (action.payload.venda !== undefined) {
        updatedList = state.stateVendas.vendas.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        );
        state.stateVendas.vendas = updatedList;
      }
    },
    deleteItemList: (state, action) => {
      // deleta item da lista local
      let deleteItemList;
      if (action.payload.list === "recebiveis") {
        deleteItemList = state.stateRecebiveis.recebiveis.filter(
          (item) => item.id !== action.payload.id
        );
        state.stateRecebiveis.recebiveis = deleteItemList;
      } else if (action.payload.list === "despesas") {
        deleteItemList = state.stateDespesas.despesas.filter(
          (item) => item.id !== action.payload.id
        );
        state.stateDespesas.despesas = deleteItemList;
      } else if (action.payload.list === "vendas") {
        deleteItemList = state.stateVendas.vendas.filter(
          (item) => item.id !== action.payload.id
        );
        state.stateVendas.vendas = deleteItemList;
      }
    },

    resetStatesRegistrations: (state) => {
      state.stateDespesas.error_despesas = false;
      state.stateDespesas.loading_despesas = false;
      state.stateDespesas.error_despesas = false;
      state.stateVendas.error_vendas = false;
      state.stateVendas.loading_vendas = false;
      state.stateVendas.success_vendas = false;
      state.stateRecebiveis.success_recebiveis = false;
      state.stateRecebiveis.error_recebiveis = false;
      state.stateRecebiveis.loading_recebiveis = false;
    },

    resetListRegistrations: (state) => {
      state.stateDespesas.despesas = [];
      state.stateRecebiveis.recebiveis = [];
      state.stateVendas.vendas = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newLancamentosAll.pending, (state) => {
      state.stateRecebiveis.success_recebiveis = false;
      state.stateRecebiveis.loading_recebiveis = true;
      state.stateRecebiveis.error_recebiveis = false;
    });
    builder.addCase(newLancamentosAll.rejected, (state, action) => {
      state.stateRecebiveis.success_recebiveis = false;
      state.stateRecebiveis.loading_recebiveis = false;
      state.stateRecebiveis.error_recebiveis = action.payload as string;
    });
    builder.addCase(newLancamentosAll.fulfilled, (state, action) => {
      state.stateRecebiveis.success_recebiveis = action.payload as string;
      state.stateRecebiveis.loading_recebiveis = false;
      state.stateRecebiveis.error_recebiveis = false;
    });
  },
});

export const {
  setImportRecebiveis,
  setImportVendas,
  setImportDespesas,
  updateList,
  deleteItemList,
  resetStatesRegistrations,
  resetListRegistrations
} = RegistrationsSlice.actions;
export default RegistrationsSlice.reducer;
