import * as React from "react";
import * as Redux from "react-redux";
import { ContainerAlertCS, Alert1CS, Alert2CS } from "./alert.style";
import { GoAlertFill } from "react-icons/go";
import { FcHighPriority } from "react-icons/fc";
import {
  despesasModel,
  recebiveisModel,
  vendasModel,
} from "../../types/Models";
import { toast } from "react-toastify";
import { CustomTsDispatch } from "../../hooks/dispatch";
import { deleteItemList } from "../../slices/RegistrationsSL";
import { RootState } from "../../store";

interface propsAlert {
  option: number;
  showAlert: () => void;
  handleSubmit: () => void;
  item?: recebiveisModel | vendasModel | despesasModel;
  keyModel?: string;
}

const AlertC: React.FC<propsAlert> = (
  props: propsAlert
): React.ReactElement => {
  const stateDespesas = Redux.useSelector(
    (state: RootState) => state.registrationsStore.stateDespesas
  );
  const stateRecebiveis = Redux.useSelector(
    (state: RootState) => state.registrationsStore.stateRecebiveis
  );
  const stateVendas = Redux.useSelector(
    (state: RootState) => state.registrationsStore.stateVendas
  );

  const dispatch = CustomTsDispatch();

  const handleDelete = () => {
    if (props.keyModel === 'RECEBIVEIS') {
      try {
        dispatch(
          deleteItemList({
            list: "recebiveis",
            id: props.item!.id,
          })
        );
        props.showAlert();
        toast.warning(`1 item de recebíveis foi 
          excluído.`);
      } catch (error) {
        console.log(error);
      }
    }
    if (props.keyModel === 'DESPESAS') {
      try {
        dispatch(deleteItemList({ list: "despesas", id: props.item!.id }));
        props.showAlert();
        toast.warning(`1 item de despesas foi 
          excluído.`);
      } catch (error) {
        console.log(error);
      }
    }
    if (props.keyModel === 'VENDAS') {
      try {
        dispatch(deleteItemList({ list: "vendas", id: props.item!.id }));
        props.showAlert();
        toast.warning(`1 item de vendas foi 
          excluído.`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAlert = () => {
    switch (props.option) {
      case 1: {
        return (
          <Alert1CS>
            <GoAlertFill />
            <p>
              Revise as informações fornecidas para garantir que estão corretas
              antes de prosseguir.
            </p>
          </Alert1CS>
        );
      }

      case 2: {
        return (
          <Alert2CS>
            <div>
              <h3> Aviso</h3>
              <p> Deseja Realmente excluir?</p>
              <span>
                <button type="button" onClick={() => handleDelete()}>
                  Sim
                </button>
                <button onClick={() => props.showAlert()}>CANCELAR</button>
              </span>
            </div>
          </Alert2CS>
        );
      }

      case 3: {
        return (
          <Alert2CS >
            <div className="temporary">
              <span style={{ display: "flex" }}>
                <FcHighPriority /> <p>ATENÇÃO</p>
              </span>
              <p
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                Você está inserindo dados financeiros sensíveis. Certifique-se
                de que todas as informações estão corretas antes de confirmar.
                Lembre-se de que estes dados impactam diretamente nos resultados
                da empresa e qualquer erro pode comprometer a análise
                financeira.
              </p>

              <p style={{ marginTop: "10px" }}>
                TOTAL VENDAS : {stateVendas.vendas.length}{" "}
              </p>
              <p>TOTAL RECEBÍVEIS : {stateRecebiveis.recebiveis.length}</p>
              <p style={{ marginBottom: "10px" }}>
                TOTAL DESPESAS : {stateDespesas.despesas.length}
              </p>

              <span>
                <button type="button" onClick={() => props.handleSubmit()}>
                  Enviar
                </button>
                <button onClick={() => props.showAlert()}>CANCELAR</button>
              </span>
            </div>
          </Alert2CS>
        );
      }

      default:
        return false;
    }
  };
  return <ContainerAlertCS>{getAlert()}</ContainerAlertCS>;
};

export default AlertC;