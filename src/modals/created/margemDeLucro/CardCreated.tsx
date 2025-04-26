import React, { useState, useEffect, useRef } from "react";
import { Container } from "./cardmodal.styled";
import { toast } from "react-toastify";
import {
  newServico,
  getAllServico,
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



const successRef = useRef(false);

useEffect(() => {
  successRef.current = false;

  return () => {
    successRef.current = false;
  };
}, []);

const [isSubmitting, setIsSubmitting] = useState(false);
const toastIdRef = useRef<React.ReactText>();

useEffect(() => {
  // Limpar toasts pendentes quando o modal fecha
  return () => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
    }
  };
}, []);

useEffect(() => {
  if (!isSubmitting) return;

  if (stateMargemDeLucro.success_MargemDeLucro) {
    const handleSuccess = async () => {
      setIsSubmitting(false);
      
      if (toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
      
      toastIdRef.current = toast.success("Procedimento cadastrado com sucesso!", {
        autoClose: 2000,
        onClose: () => {
          const currentDate = new Date();
          dispatch(getAllServico({
            mes: currentDate.getMonth() + 1,
            ano: currentDate.getFullYear()
          })).finally(() => {
            dispatch(resetStatesMargemDeLucro());
            onClose();
          });
        }
      });
    };

    handleSuccess();
  }

  if (stateMargemDeLucro.error_MargemDeLucro) {
    setIsSubmitting(false);
    
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
    }
    
    toastIdRef.current = toast.error(
      typeof stateMargemDeLucro.error_MargemDeLucro === 'string' 
        ? stateMargemDeLucro.error_MargemDeLucro 
        : 'Ocorreu um erro',
      { autoClose: 5000 }
    );
    
    dispatch(resetStatesMargemDeLucro());
  }
}, [stateMargemDeLucro, dispatch, onClose, isSubmitting]);

const handleSaveService = () => {
  if (!nome || !tipo) {
    toast.error("Preencha todos os campos!");
    return;
  }

  setIsSubmitting(true);
  dispatch(newServico({ nome, tipo, date }));
};


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
            <button type="button" onClick={handleSaveService}>
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
