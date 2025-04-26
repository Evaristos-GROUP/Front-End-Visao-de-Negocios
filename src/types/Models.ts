export type recebiveisModel = {
  id: string;
  type: string;
  valor: number;
  fonte_de_arrecadacao: string;
  descricao?: string;
  dataReferencia : Date
};

export type recebiveisDispatch = {
  recebiveis: recebiveisModel[];
};

export type despesasModel = {
  id: string;
  type: string;
  valor: number;
  sub_conta: string;
  descricao?: string;
  dataReferencia : Date
};

export interface despesasDispatch {
  despesas: despesasModel[];
}
export type vendasModel = {
  id: string;
  type: string;
  valor: number;
  fonte_de_arrecadacao: string;
  descricao?: string;
  dataReferencia : Date
};

export interface vendasDispatch {
  vendas: vendasModel[];
}


