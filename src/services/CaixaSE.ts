import { ApiDefaultResponse } from "../types/Api";
import axiosInstance from "../config/api";

class caixaService {
  static async init(caixaInicial: number): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `api/caixa/iniciar-caixa`,
        { caixaInicial: caixaInicial }
      );

      return response.data;
    } catch (error) {
      const now = new Date();
      console.error(error);
      return {
        http_status_code: 500,
        data: [],
        message: "Erro no servidor de aplicações.",
        current_datetime: now,
        errors: true,
      };
    }
  }
}

export default caixaService;
