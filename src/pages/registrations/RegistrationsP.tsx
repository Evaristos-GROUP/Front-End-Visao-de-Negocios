import * as React from "react";
import { FcSearch } from "react-icons/fc";
import {
  ContainerRegistrationsCS,
  BoxRegistrationsCs,
} from "./registrations.styled";
import TableC from "../../components/table/TableC";
import OptionRegisterC from "../../components/optionRegister/OptionRegister";
import FileUpload from "../../components/fileUpload/FileUpload";
import { CustomTsDispatch } from "../../hooks/dispatch";
import {
  newLancamentosAll,
  resetListRegistrations,
  resetStatesRegistrations,
} from "../../slices/RegistrationsSL";
import { toast } from "react-toastify";
import AlertC from "../../components/alert/AlertC";
import * as Redux from "react-redux";
import { getInfosGerais } from "../../slices/infosGerais";
import { RootState } from "../../store";
import InitCaixa from "./InitCaixa";

const RegistrationsP = (): React.ReactElement => {
  const dispatch = CustomTsDispatch();

  const [showAlertSubmit, setShowAlertSubmit] = React.useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

  const [optionRegister, setOptionRegister] = React.useState<number | null>(
    null
  );

  const statesRegistrations = Redux.useSelector(
    (state: RootState) => state.registrationsStore
  );

  const caixaStatesFromInfoGerais = Redux.useSelector(
    (state: RootState) => state.infosGeraisStore.infosGerais
  );

  React.useEffect(() => {
    const month = new Date().toISOString().slice(0, 7);
    dispatch(getInfosGerais(month));
  }, [dispatch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleCancel = () => {
    dispatch(resetListRegistrations());
  };

  const handleSubmit = () => {
    dispatch(newLancamentosAll());
    dispatch(resetStatesRegistrations());
    dispatch(resetListRegistrations());
  };

  React.useEffect(() => {
    if (
      typeof statesRegistrations.stateRecebiveis.success_recebiveis === "string"
    ) {
      toast.success("Lançamentos realizados com sucesso.");

      setTimeout(() => {
        dispatch(resetStatesRegistrations());
        dispatch(resetListRegistrations());
        setShowAlertSubmit(!showAlertSubmit);
      }, 1000);
    }
    if (
      typeof statesRegistrations.stateRecebiveis.error_recebiveis === "string"
    ) {
      toast.error(
        "Erro ao adicionar lançamentos, verifique os dados e tente novamente."
      );

      setTimeout(() => {
        dispatch(resetStatesRegistrations());
        dispatch(resetListRegistrations());
        setShowAlertSubmit(!showAlertSubmit);
      }, 1000);
    }
  }, [
    statesRegistrations.stateRecebiveis.success_recebiveis,
    statesRegistrations.stateRecebiveis.error_recebiveis,
  ]);

  const registrationTypes = ["RECEBIVEIS", "DESPESAS", "VENDAS"];
  const registrationType =
    optionRegister !== null ? registrationTypes[optionRegister] : "";

  return (
    <ContainerRegistrationsCS>
      <div>
        <BoxRegistrationsCs>
          <div className="optionRegister">
            <OptionRegisterC
              values={registrationTypes}
              setIndex={(index: number) => setOptionRegister(index)}
            />
          </div>

          <div className="actions">
            <span>
              <FileUpload />
              <p>.XLSX / .XLS / .CSV</p>
            </span>
          </div>

          <div className="search">
            <input
              type="text"
              placeholder="BUSCAR POR NOME"
              onChange={handleInputChange}
            />
            {inputValue.trim() === "" && <FcSearch />}
            {optionRegister !== null && (
              <>
                <button
                  onClick={() => {
                    setShowAlertSubmit(!showAlertSubmit);
                  }}
                >
                  ENVIAR
                </button>
                <button type="button" onClick={() => handleCancel()}>
                  CANCELAR
                </button>
              </>
            )}
          </div>
        </BoxRegistrationsCs>
      </div>

      <TableC registrationType={registrationType} filterName={inputValue} />

      {showAlertSubmit && (
        <AlertC
          option={3}
          showAlert={() => setShowAlertSubmit(false)}
          handleSubmit={handleSubmit}
        />
      )}

      {!(
        caixaStatesFromInfoGerais && caixaStatesFromInfoGerais.caixa.isModified
      ) && <InitCaixa />}
    </ContainerRegistrationsCS>
  );
};

export default RegistrationsP;
