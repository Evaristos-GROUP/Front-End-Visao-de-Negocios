import { UseDispatch } from "react-redux";
import { recebiveisModel, vendasModel, despesasModel } from "./Models";
import {
  informacoesGeraisParaOFrontModel,
  subConta,
} from "./models/infosGeraisMO";
import { UsersList } from "./models/userMO";
import { DreModel } from "./models/Relatorios/DREMO";
import { MargemDeLucroModel } from "./models/Relatorios/MargemDeLucroMO";

export interface vendasStates {
  vendas: vendasModel[];
  error_vendas: boolean | string;
  success_vendas: boolean | string;
  loading_vendas: boolean;
}

export interface recebiveisStates {
  recebiveis: recebiveisModel[];
  error_recebiveis: boolean | string;
  success_recebiveis: boolean | string;
  loading_recebiveis: boolean;
}

export interface despesasStates {
  despesas: despesasModel[];
  error_despesas: boolean | string;
  success_despesas: boolean | string;
  loading_despesas: boolean;
}

export interface MargemDeLucroStates {
  MargemDeLucro: MargemDeLucroModel | null; 
  error_MargemDeLucro: boolean | string;
  success_MargemDeLucro: boolean | string;
  loading_MargemDeLucro: boolean;
}

export interface infosGeraisStates {
  infosGerais: informacoesGeraisParaOFrontModel | undefined;
  error_infoGerais: boolean | string;
  success_infoGerais: boolean | string;
  loading_infoGerais: boolean;
}

export interface authStates {
  auth: string | null;
  error_auth: boolean | string;
  success_auth: boolean | string;
  loading_auth: boolean;
}
export interface userStates {
  user: UseDispatch | null;
  userList: UsersList[];
  error_user: boolean | string;
  success_user: boolean | string;
  loading_user: boolean;
}

export interface subContaState {
  subConta: subConta | null;
  error_subConta: boolean | string;
  success_subConta: boolean | string;
  loading_subConta: boolean;
}

export interface fonteArrecadacaoState {
  fonteArrecadacao: string;
  error_fonteArrecadacao: boolean | string;
  success_fonteArrecadacao: boolean | string;
  loading_fonteArrecadacao: boolean;
}

export interface DreStates {
  Dre: DreModel[];
  error_Dre: boolean | string;
  success_Dre: boolean | string;
  loading_Dre: boolean;
}


export interface caixaStates {
  success_caixa: boolean,
  error_caixa: boolean,
  loading_caixa: boolean,
}
