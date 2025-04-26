import * as React from "react";
import * as Redux from "react-redux";

import { ContainerInitCaixa } from "./initcaixa.styled";
import cashRegisterImg from "../../../src/assets/cash.png";
import { CustomTsDispatch } from "../../hooks/dispatch";
import { patchInitCaixa, resetStatesCaixa } from "../../slices/CaixaSL";
import { RootState } from "../../store";
import { toast } from "react-toastify";

const InitCaixa = (): React.ReactElement | string => {
  const [value, setValue] = React.useState<string>('');
  const [showCaixa, setShowCaixa] = React.useState<boolean>(true);
  const dispatch = CustomTsDispatch();

  const statesCaixa = Redux.useSelector((state: RootState) => state.CaixaStore);

  const handleInitCaixa = () => {
    dispatch(patchInitCaixa(Number(value.replace(/\D/g, "")) / 100));
  };

  React.useEffect(() => {
    if (statesCaixa.success_caixa) {
      toast.success("Caixa iniciado com sucesso.");
      setShowCaixa(false);
      setTimeout(() => {
        setShowCaixa(false);
        dispatch(resetStatesCaixa());
      }, 3000);
    }
  }, [statesCaixa.success_caixa]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    const num = Number(raw) / 100;

    const formatado = num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    });

    setValue(formatado);
  };


  return (
    showCaixa ?
      <ContainerInitCaixa>
        <span>
          <img src={cashRegisterImg} alt="w" />
          <p> Inicie o caixa da empresa para continuar.</p>
          <input
            type="text"
            value={`R$ ${value}`}
            onChange={handleChange}
            placeholder="0,00"
          />


          <button onClick={handleInitCaixa}>Iniciar</button>
        </span>
      </ContainerInitCaixa>
      : ''
  );
};

export default InitCaixa;
