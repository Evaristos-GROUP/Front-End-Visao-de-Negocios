/* eslint-disable @typescript-eslint/no-explicit-any */
import * as XLSX from "xlsx";
import {
  setImportRecebiveis,
  setImportDespesas,
  setImportVendas,
} from "../slices/RegistrationsSL";
import { Dispatch } from "@reduxjs/toolkit";
import { normalizeFonteDeArrecadacao, normalizeSubConta } from "./normalizer";
import { RootState } from "../store";

export const importarPlanilhaRedux = async (
  file: File,
  dispatch: Dispatch,
  getState: () => RootState
): Promise<void> => {
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });

    function formatValor(valor: string | number): string {
      const [inteiro, decimal = ""] = String(valor).split(".");
      const decimalTruncado = decimal.substring(0, 2).padEnd(2, "0");
      return `${inteiro}.${decimalTruncado}`;
    }

    const state = getState();
    const subContasCadastradas =
      state.infosGeraisStore.infosGerais!.sub_contas.map(
        (subConta) => subConta.nome
      );
    const fontesCadastradas =
      state.infosGeraisStore.infosGerais!.fonte_arrecadacoes;

    const processarAba = (sheetName: string, sheet: XLSX.WorkSheet) => {
      const rows = XLSX.utils.sheet_to_json(sheet);

      try {
        switch (sheetName) {
          case "RECEBIVEIS":
            return rows.map((row: any, index) => ({
              id: index,
              type: "RECEBIVEIS",
              valor: formatValor(row.Valor) || 0,
              fonte_de_arrecadacao: normalizeFonteDeArrecadacao(
                row["Fonte de Arrecadação"],
                fontesCadastradas
              ),
              descricao: row.Descrição || "",
              dataReferencia: row.Data
                ? new Date(
                    (row.Data - 25569) * 86400000 + 12 * 3600000
                  ).toLocaleDateString("pt-BR")
                : new Date().toLocaleDateString("pt-BR"),
            }));

          case "DESPESAS":
            return rows.map((row: any, index) => ({
              id: index,
              type: "DESPESAS",
              valor: formatValor(row.Valor) || 0,
              sub_conta: normalizeSubConta(
                row["Sub-Conta"],
                subContasCadastradas
              ),
              descricao: row.Descrição || "",
              dataReferencia: row.Data
                ? new Date(
                    (row.Data - 25569) * 86400000 + 12 * 3600000
                  ).toLocaleDateString("pt-BR")
                : new Date().toLocaleDateString("pt-BR"),
            }));

          case "VENDAS":
            return rows.map((row: any, index) => ({
              id: index,
              type: "VENDAS",
              valor: formatValor(row.Valor) || 0,
              fonte_de_arrecadacao: normalizeFonteDeArrecadacao(
                row["Fonte de Arrecadação"],
                fontesCadastradas
              ),
              descricao: row.Descrição || "",
              dataReferencia: row.Data
                ? new Date(
                    (row.Data - 25569) * 86400000 + 12 * 3600000
                  ).toLocaleDateString("pt-BR")
                : new Date().toLocaleDateString("pt-BR"),
            }));

          default:
            throw new Error(`Aba ${sheetName} não reconhecida.`);
        }
      } catch (error: any) {
        throw new Error(
          `Erro ao processar a aba "${sheetName}". Detalhes: ${error.message}`
        );
      }
    };

    const recebiveis = processarAba(
      "RECEBIVEIS",
      workbook.Sheets["RECEBIVEIS"]
    );
    const despesas = processarAba("DESPESAS", workbook.Sheets["DESPESAS"]);
    const vendas = processarAba("VENDAS", workbook.Sheets["VENDAS"]);

    if (recebiveis.length) {
      dispatch(setImportRecebiveis(recebiveis));
    }
    if (vendas.length) {
      dispatch(setImportVendas(vendas));
    }
    if (despesas.length) {
      dispatch(setImportDespesas(despesas));
    }
  } catch (erro) {
    throw new Error(erro as string);
  }
};
