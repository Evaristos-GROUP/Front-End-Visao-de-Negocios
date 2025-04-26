
import { ApiDefaultResponse } from "../types/Api";
import axiosInstance from "../config/api";

class RelatoriosSE {
  static async getDRE(): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.get<ApiDefaultResponse>(
        `api/relatorios/dre`,
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

export default RelatoriosSE;
