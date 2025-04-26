import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { CustomTsDispatch } from "../../../hooks/dispatch";
import { getAllServico } from "../../../slices/Relatorios/MargemDeLucroSL";
import { BoxMonth, MargemDeLucroContainer } from "./margemDeLucro.styled";
import CardList from "../../../components/cardList/CardList";

const MargemDeLucroC = () => {
  const dispatch = CustomTsDispatch();
  const margemState = useSelector(
    (state: RootState) => state.MargemDeLucroStore.MargemDeLucro
  );

  const currentDate = new Date();
  const mesAtual = `${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  const [mesSelecionado, setMesSelecionado] = React.useState<string>(mesAtual);

  React.useEffect(() => {
    if (mesSelecionado) {
      const [mes, ano] = mesSelecionado.split("/").map(Number);
      dispatch(getAllServico({ mes, ano }));
    }
  }, [mesSelecionado, dispatch]);

  return (
    <MargemDeLucroContainer>
      <h1>Margem de Lucro</h1>

      <BoxMonth>
        <p>Mês Referência:</p>
        <select
          value={mesSelecionado}
          onChange={(e) => setMesSelecionado(e.target.value)}
        >
          <option value="" disabled>
            Selecione um mês
          </option>

          {margemState?.periodosDisponiveis
            ?.slice()
            .sort((a, b) => {
              const [mesA, anoA] = a.split("/").map(Number);
              const [mesB, anoB] = b.split("/").map(Number);
              return anoA === anoB ? mesB - mesA : anoB - anoA;
            })
            .map((mes, index) => (
              <option key={index} value={mes}>
                {mes}
              </option>
            ))}
        </select>
      </BoxMonth>

      <CardList />
    </MargemDeLucroContainer>
  );
};

export default MargemDeLucroC;
