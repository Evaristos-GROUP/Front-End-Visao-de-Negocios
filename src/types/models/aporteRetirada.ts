export interface aporteRetiradaMO {
  tipo: "APORTE" | "RETIRADA";
  valor: number;
  data: Date;
  descricao: string;
}
