import { ApiDefaultResponse } from "../types/Api";
import axiosInstance from "../config/api";
import { aporteRetiradaMO } from "../types/models/aporteRetirada";

class AporteRetiradaSE {
  static async newAporteRetirada(
    aporteRetirada: aporteRetiradaMO
  ): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.post<ApiDefaultResponse>(
        `api/caixa/aporte-retirada/new`,
        aporteRetirada
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

export default AporteRetiradaSE;
