export type lancamentoGenerico = {
  valor: number;
  data: Date;
  tipoDeLancamento: string;
};

export type subConta = {
  nome: string;
  tipo: string;
};

export type caixaTotalPordia = {
  valor: number;
  data: Date;
};

export type caixa = {
  id: string;
  caixaInicial: number;
  caixaTotal: number;
  isModified: boolean;
  empresa: string;
  totalPorDia: caixaTotalPordia[];
};

export type dashboard = {
  id: string;
  despesa_total: number;
  recebivel_total: number;
  venda_total: number;

  despesas: lancamentoGenerico[];
  vendas: lancamentoGenerico[];
  recebiveis: lancamentoGenerico[];

  totalDespesasPorRange: number;
  totalRecebiveisPorRange: number;
  totalVendasPorRange: number;
  caixaTotalPordia: caixaTotalPordia[];
  data_referencia: Date;
};

export interface informacoesGeraisParaOFrontModel {
  //EMPRESA
  id: string;
  nome: string;
  cnpj: string;
  created_at: Date;
  update_at: Date;

  sub_contas: subConta[];
  fonte_arrecadacoes: string[];

  // DASHBOARD
  dashboard: dashboard;
  // CAIXA
  caixa: caixa;
  mesesDisponiveis: string[]
}
