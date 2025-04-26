import { ApiDefaultResponse } from "../types/Api";
import axiosInstance from "../config/api";

class SubContaSE {
  static async newSubConta(subConta: {
    nome: string;
    tipo: string;
  }): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `api/empresas/subConta/add`,
        subConta,
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

  static async updateSubConta(subConta: {
    novaSubConta: string;
    subContaExistente: string;
  }): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `api/empresas/subConta/update`,
        subConta
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

  static async deleteSubConta(subConta: {
    subConta: string;
  }): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `api/empresas/subConta/delete`,
        subConta
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

export default SubContaSE;
