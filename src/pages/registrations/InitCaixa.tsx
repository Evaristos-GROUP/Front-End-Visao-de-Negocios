import * as React from "react";
import * as Redux from "react-redux";

import { ContainerInitCaixa } from "./initcaixa.styled";
import cashRegisterImg from "../../../src/assets/cash.png";
import { CustomTsDispatch } from "../../hooks/dispatch";
import { patchInitCaixa, resetStatesCaixa } from "../../slices/CaixaSL";
import { RootState } from "../../store";
import { toast } from "react-toastify";

const InitCaixa = (): React.ReactElement => {
  const [value, setValue] = React.useState<number>(0);
  const dispatch = CustomTsDispatch();

  const statesCaixa = Redux.useSelector((state: RootState) => state.CaixaStore);

  const handleInitCaixa = () => {
    dispatch(patchInitCaixa(value));
  };

  React.useEffect(() => {
    if (statesCaixa.success_caixa) {
      toast.success("Caixa iniciado com sucesso.");

      setTimeout(() => {
        dispatch(resetStatesCaixa());
      }, 3000);
    } 
  }, [statesCaixa.success_caixa]);

  return (
    <ContainerInitCaixa>
      <span>
        <img src={cashRegisterImg} alt="w" />
        <p> Inicie o caixa da empresa para continuar.</p>

        <input
          type="number"
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <button onClick={handleInitCaixa}>Iniciar</button>
      </span>
    </ContainerInitCaixa>
  );
};

export default InitCaixa;
