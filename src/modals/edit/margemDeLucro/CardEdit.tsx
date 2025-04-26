import * as React from "react";
import { servicos } from "../../../types/models/Relatorios/MargemDeLucroMO";
import { Container } from "./cardmodal.styled";
import { CustomTsDispatch } from "../../../hooks/dispatch";
import {
  deleteServico,
  updateServico,
} from "../../../slices/Relatorios/MargemDeLucroSL";
import { FaCheck } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

interface CardProps {
  item: servicos;
  onEdit: () => void;
}

const CardEdit: React.FC<CardProps> = ({ item, onEdit }) => {
  const dispatch = CustomTsDispatch();

  const [valorDeVenda, setValorDeVenda] = React.useState<number>(
    item.valorVenda
  );
  const [insumos, setInsumos] = React.useState<number>(item.valorInsumos);
  const [custoMedico, setCustoMedico] = React.useState<number>(item.custoMed);
  const [imposto, setImposto] = React.useState<number>(item.imposto);
  const [check, setCheck] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<string>("");

  const [atendimentos, setAtendimentos] = React.useState<number>(
    item.qtdPorMes
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newItem = {
      ...item,
      valorVenda: valorDeVenda,
      valorInsumos: insumos,
      custoMed: custoMedico,
      imposto: imposto,
      qtdPorMes: atendimentos,
      date: date,
    };

    dispatch(updateServico(newItem));
  };

  const handleDelete = (id: string) => {
    dispatch(deleteServico(Number(id)));
  };

  return (
    <Container onSubmit={handleSubmit}>
      <h2>{item.nomeProcedimento}</h2>
      <label>Valor de venda</label>
      <input
        type="number"
        placeholder="R$ Insira o valor"
        value={valorDeVenda}
        onChange={(e) => setValorDeVenda(Number(e.target.value))}
      />
      <label>Insumos</label>
      <input
        type="number"
        placeholder="R$ Insira o valor"
        value={insumos}
        onChange={(e) => setInsumos(Number(e.target.value))}
      />

      <label>Custo medico</label>
      <input
        type="number"
        placeholder="R$ Insira o valor"
        value={custoMedico}
        onChange={(e) => setCustoMedico(Number(e.target.value))}
      />

      <label>% de imposto</label>
      <input
        type="number"
        value={imposto}
        onChange={(e) => setImposto(Number(e.target.value))}
      />

      <label>Atendimentos</label>
      <input
        type="number"
        placeholder="Quantos atendidos?"
        value={atendimentos}
        onChange={(e) => setAtendimentos(Number(e.target.value))}
      />

      <label>Modificar todos os registros</label>

      <div className={`check ${check ? `active` : `disable`}`}>
        <FaCheck onClick={() => setCheck(!check)} />
        <input
          disabled={!check}
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {check && (
        <p>
          {`As alterações serão aplicadas a todos os registros mensais do procedimento '${item.nomeProcedimento}', exceto no campo 'ATENDIMENTOS'.`}
        </p>
      )}

      <div className="Button">
        <button type="submit">Salvar</button>
        <button className="cancel-btn" type="button" onClick={onEdit}>
          Cancelar
        </button>
      </div>

      <button
        className="delete-btn"
        type="button"
        onClick={() => handleDelete(item.id)}
      >
        EXCLUIR <MdDeleteOutline />
      </button>
    </Container>
  );
};

export default CardEdit;
