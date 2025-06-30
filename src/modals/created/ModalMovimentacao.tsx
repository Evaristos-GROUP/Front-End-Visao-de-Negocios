import React, { useState } from "react";
import {
  ModalContainer,
  Overlay,
  ModalContent,
} from "./modalMovimentacao.styled";
import { newAporteRetirada } from "../../slices/AporteRetirada";
import { aporteRetiradaMO } from "../../types/models/aporteRetirada";

import { CustomTsDispatch } from "../../hooks/dispatch";

interface ModalMovimentacaoProps {
  onClose: () => void;
}

const ModalMovimentacao: React.FC<ModalMovimentacaoProps> = ({ onClose }) => {
  const [tipo, setTipo] = useState<"APORTE" | "RETIRADA">("APORTE");
  const [valor, setValor] = useState<number>(0);
  const [data, setData] = useState<Date | null>(null);
  const [descricao, setDescricao] = useState("");

  const dispatch = CustomTsDispatch();

  const handleSubmit = () => {
    const payload: aporteRetiradaMO = { tipo, valor, data: data!, descricao };
    dispatch(newAporteRetirada(payload));
    onClose();
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ModalContainer>
        <ModalContent>
          <h3>Nova Movimentação</h3>

          <label>Tipo</label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "APORTE" | "RETIRADA")}
          >
            <option value="APORTE">Aporte</option>
            <option value="RETIRADA">Retirada</option>
          </select>

          <label>Valor</label>
          <input
            type="number"
            step="0.01"
            placeholder="Digite o valor"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />

          <label>Data</label>
          <input
            type="date"
            value={data ? data.toISOString().split("T")[0] : ""}
            onChange={(e) => {
              const value = e.target.value;
              if (value) setData(new Date(value));
              else setData(null);
            }}
          />

          <label>Descrição</label>
          <input
            type="text"
            placeholder="Opcional"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <div className="actions">
            <button className="confirm" onClick={handleSubmit}>
              Salvar
            </button>
            <button className="cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </ModalContent>
      </ModalContainer>
    </>
  );
};

export default ModalMovimentacao;
