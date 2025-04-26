import { ApiDefaultResponse } from "../types/Api";
import axiosInstance from "../config/api";
import { userDispatch } from "../types/models/userMO";

class UserSE {
  static async newUser(newUser: userDispatch): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.post<ApiDefaultResponse>(
        `api/usuarios/newUser`,
        newUser
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

  static async getAllUsers(): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.get<ApiDefaultResponse>(
        `api/usuarios/getAllUsers`
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

  static async inactiveAUser(id: string): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `api/usuarios/inactiveAUser/${id.toString()}`
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

  static async updateUser(newUser: {
    id: string;
    nome: string;
    email: string;
    funcao: string;
  }): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `api/usuarios/updateUser/${newUser.id}`,
        {
          nome: newUser.nome,
          email: newUser.email,
          funcao: newUser.funcao,
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

export default UserSE;
