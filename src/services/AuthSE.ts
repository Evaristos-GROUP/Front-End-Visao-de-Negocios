import axios from "axios";
import { ApiDefaultResponse } from "../types/Api";
import { BASE_URL } from "../config/api";
import { authModel, authResponseLogin } from "../types/models/authMO";

class authService {
  static async login(user: authModel): Promise<ApiDefaultResponse> {
    try {
      const response = await axios.post<ApiDefaultResponse>(
        `${BASE_URL}api/auth/login`,
        user,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.errors === false) {
        let data;
        const rawData = response.data.data as unknown[];

        if (rawData.length > 0) {
          data = rawData[0] as authResponseLogin;

          localStorage.setItem("clientToken", data.token);
          localStorage.setItem(
            "user",
            `${data.user.email} | ${data.user.nome} | ${data.user.funcao}|`
          );
        }
      }

      return response.data;
    } catch (error) {
      const now = new Date();
      console.log(error);
      return {
        http_status_code: 500,
        data: [],
        message: "Erro no servidor de aplicações.",
        current_datetime: now,
        errors: true,
      };
    }
  }

  static async forgotPassword(email: string): Promise<ApiDefaultResponse> {
    try {
      const response = await axios.post<ApiDefaultResponse>(
        `${BASE_URL}api/auth/forgot-password`,
        email
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

  static async logout(): Promise<ApiDefaultResponse> {
    const now = new Date();
    try {
      localStorage.removeItem("clientToken");
      localStorage.removeItem("user");

      return {
        http_status_code: 200,
        data: [],
        message: "logout realizado com sucesso!",
        current_datetime: now,
        errors: true,
      };
    } catch (error) {
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

export default authService;
