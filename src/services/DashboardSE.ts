import axios from "axios";
import { ApiDefaultResponse } from "../types/Api";
import { BASE_URL } from "../config/api";

class dashboardService {
  static async getDashboard(param: string): Promise<ApiDefaultResponse> {
    try {
      const response = await axios.get<ApiDefaultResponse>(
        `${BASE_URL}api/empresas/get-info-dashboard-caixa?mesAno=${param}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("clientToken")}`,
            "Content-Type": "application/json",
            
          },
               withCredentials: true,
        }
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const now = new Date();
      console.log(error)
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
export default dashboardService;
