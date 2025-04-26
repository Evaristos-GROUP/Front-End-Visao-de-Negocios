import axios from "axios";
import { ApiDefaultResponse } from "../types/Api";
import axiosInstance, { BASE_URL } from "../config/api";

import {
  despesasDispatch,
  despesasModel,
  recebiveisDispatch,
  recebiveisModel,
  vendasDispatch,
  vendasModel,
} from "../types/Models";

class RegistrationsService {
  
  static async newDespesa(
    newDespesa: despesasDispatch
  ): Promise<ApiDefaultResponse> {
    try {
      const response = await fetch(`${BASE_URL}api/despesas/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDespesa), // Envia o objeto como JSON
      });

      if (!response.ok) {
        throw new Error("Erro na requisição");
      }

      const data: ApiDefaultResponse = await response.json();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const now = new Date();
      return {
        http_status_code: 500,
        data: [],
        message: "Erro no servidor de aplicações.",
        current_datetime: now,
        errors: true,
      };
    }
  }

  static async newVendas(
    newVendas: vendasDispatch
  ): Promise<ApiDefaultResponse> {
    try {
      const response = await axios.post<ApiDefaultResponse>(
        `${BASE_URL}api/vendas/new`,
        newVendas,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const now = new Date();
      return {
        http_status_code: 500,
        data: [],
        message: "Erro no servidor de aplicações.",
        current_datetime: now,
        errors: true,
      };
    }
  }

  static async newRecebiveis(
    newRecebiveis: recebiveisDispatch
  ): Promise<ApiDefaultResponse> {
    try {
      const response = await axios.post<ApiDefaultResponse>(
        `${BASE_URL}api/recebiveis/new`,
        newRecebiveis,

        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const now = new Date();
      return {
        http_status_code: 500,
        data: [],
        message: "Erro no servidor de aplicações.",
        current_datetime: now,
        errors: true,
      };
    }
  }


  static async newLancametosAll(
    recebiveis: recebiveisModel[],
    despesas: despesasModel[],
    vendas: vendasModel[],
  ): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.post<ApiDefaultResponse>(
        `api/lancamentos/all/new`,
        { recebiveis, despesas, vendas },
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const now = new Date();
      return {
        http_status_code: 500,
        data: [],
        message: "Erro no servidor de aplicações.",
        current_datetime: now,
        errors: true,
      };
    }
  }
}
export default RegistrationsService;
