import { ApiDefaultResponse } from "../types/Api";
import axiosInstance from "../config/api";
import { servicos } from "../types/models/Relatorios/MargemDeLucroMO";

class TipoServicoSE {
  static async newTipoServico(servico: {
    nomeProcedimento: string;
    tipoProcedimento: string;
    date: string;
  }): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.post<ApiDefaultResponse>(
        `/api/relatorios/procedimentos/new`,
        servico
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return error.response.data;
      }

      return {
        http_status_code: 500,
        data: [],
        message: "Erro ao adicionar serviço",
        current_datetime: new Date(),
        errors: true,
      };
    }
  }

  static async deleteServico(id: number): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.delete<ApiDefaultResponse>(
        `/api/relatorios/procedimentos/delete/${id}`
      );
      return response.data;
    } catch (error: any) {
      return {
        http_status_code: 500,
        data: [],
        message: "Erro ao deletar serviço.",
        current_datetime: new Date(),
        errors: true,
      };
    }
  }

  static async getAllServico(values: {
    mes: number;
    ano: number;
  }): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.get<ApiDefaultResponse>(
        `/api/relatorios/procedimentos/getAll?mes=${values.mes}&ano=${values.ano}`
      );
      return response.data;
    } catch (error: any) {
      return {
        http_status_code: 500,
        data: [],
        message: "Erro ao buscar serviços.",
        current_datetime: new Date(),
        errors: true,
      };
    }
  }

  static async updateServico(servico: servicos): Promise<ApiDefaultResponse> {
    try {
      const response = await axiosInstance.patch<ApiDefaultResponse>(
        `/api/relatorios/procedimentos/update/${servico.id}`,
        {
          custoMed: servico.custoMed,
          imposto: servico.imposto,
          qtdPorMes: servico.qtdPorMes,
          valorVenda: servico.valorVenda,
          valorInsumos: servico.valorInsumos,
          date: servico.date,
        }
      );
      return response.data;
    } catch (error: any) {
      return {
        http_status_code: 500,
        data: [],
        message: "Erro ao alimentar serviço.",
        current_datetime: new Date(),
        errors: true,
      };
    }
  }
}

export default TipoServicoSE;
