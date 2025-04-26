import React, { useState } from "react";
import { Container } from "./cardmodal.styled";
import { toast } from "react-toastify";
import {
  newServico,
  resetStatesMargemDeLucro,
} from "../../../slices/Relatorios/MargemDeLucroSL";
import { CustomTsDispatch } from "../../../hooks/dispatch";
import { RootState } from "../../../store";
import * as Redux from "react-redux";
import { FaCheck } from "react-icons/fa";
interface NovoServicoModalProps {
  onClose: () => void;
}

const CardCreated: React.FC<NovoServicoModalProps> = ({ onClose }) => {
  const stateMargemDeLucro = Redux.useSelector(
    (state: RootState) => state.MargemDeLucroStore
  );

  const dispatch = CustomTsDispatch();

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [date, setDate] = useState("");
  const [showDate, setShowDate] = useState(false);

  const handleSaveService = () => {
    dispatch(resetStatesMargemDeLucro());

    if (!nome || !tipo) {
      toast.error("Preencha todos os campos!");
      return;
    }

    dispatch(newServico({ nome, tipo, date }));
  };

  React.useEffect(() => {
    if (stateMargemDeLucro.success_MargemDeLucro) {
      toast.success("Procedimento cadastrado com sucesso.");

      setTimeout(() => {
        dispatch(resetStatesMargemDeLucro());
      }, 2000);
    }

    if (
      typeof stateMargemDeLucro.error_MargemDeLucro === "string" &&
      stateMargemDeLucro.error_MargemDeLucro !== ""
    ) {
      toast.error(stateMargemDeLucro.error_MargemDeLucro);

      setTimeout(() => {
        dispatch(resetStatesMargemDeLucro());
      }, 1000);
    }
  }, [
    stateMargemDeLucro.success_MargemDeLucro,
    stateMargemDeLucro.error_MargemDeLucro,
    dispatch,
  ]);

  return (
    <Container>
      <div className="modal-content">
        <h2 id="modal-title">Adicionar</h2>

        <form>
          <label htmlFor="service-name">Nome</label>
          <input
            id="service-name"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do serviço"
            required
          />

          <label htmlFor="service-type">Tipo</label>
          <select
            id="service-type"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
          >
            <option value="" disabled>
              Selecione o tipo
            </option>
            <option value="CONSULTA">Consulta Médica</option>
            <option value="PROCEDIMENTO">Exame / Procedimento</option>
          </select>

          <label htmlFor="service-date">Data</label>

          <div className={`showDateOption ${showDate ? `active` : `disable`}`}>
            <FaCheck onClick={() => setShowDate(!showDate)} />
            <input
              disabled={!showDate}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {showDate && (
            <p>
              Ao selecionar um mês anterior, o procedimento será cadastrado para
              cada mês, do escolhido até o atual.
            </p>
          )}

          <div className="Button">
            <button type="button" onClick={() => handleSaveService()}>
              Salvar
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CardCreated;
