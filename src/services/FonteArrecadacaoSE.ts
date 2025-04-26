
import { ApiDefaultResponse } from "../types/Api";
import axiosInstance from "../config/api";

class FonteArrecadacaoSE {
  static async newFonteArrecadacao(fonteArrecadacao: { fonteArrecadacao: string }): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `api/empresas/fonteArrecadacao/add`,
        fonteArrecadacao,
      );
      return response.data;
    } catch (error: any) {
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
  static async deleteFonteArrecadacao(fonteArrecadacao: { fonteArrecadacao: string }): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `api/empresas/fonteArrecadacao/delete`,
        fonteArrecadacao,
      );
      return response.data;
    } catch (error: any) {
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
  static async updateFonteArrecadacao( fonte : {novafonteArrecadacao: string, fonteArrecadacaoExistente: string}): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `api/empresas/fonteArrecadacao/update`,
        {
          novafonteArrecadacao : fonte.novafonteArrecadacao,
          fonteArrecadacaoExistente : fonte.fonteArrecadacaoExistente
        }
      );
      return response.data;
    } catch (error: any) {
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

export default FonteArrecadacaoSE;
