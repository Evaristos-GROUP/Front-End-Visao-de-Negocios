export type servicos = {
  id: string,
  nomeProcedimento: string,
  tipoProcedimento: string,
  valorInsumos: number,
  custoMed: number,
  valorVenda: number,
  imposto: number,
  qtdPorMes: number,
  mediaDespesa: number,
  date: string,
  custoTotal: number,
  createdAt: Date,
  updateAt: Date
}



export type MargemDeLucroModel = {
  periodosDisponiveis: string[];
  servicosPorTipo: { [tipo: string]: servicos[] };
  totalConsultasExames: number,
  totalAtendimentos: number,
  totalDespesaFixa: number
};