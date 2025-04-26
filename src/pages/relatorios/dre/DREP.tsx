import * as React from "react";
import * as Redux from "react-redux";
import { FaCheck } from "react-icons/fa6";
import { BoxYear, ContainerDERPS } from "./dre.styled";
import { CustomTsDispatch } from "../../../hooks/dispatch";
import { getDRE } from "../../../slices/Relatorios/DRESL";
import { RootState } from "../../../store";
import Skeleton from "react-loading-skeleton";

const DREP = () => {
  const dispatch = CustomTsDispatch();
  const statesDRE = Redux.useSelector((state: RootState) => state.DRESTore);

  const [index1AH, setIndex1AH] = React.useState<number | null>(null);
  const [index2AH, setIndex2AH] = React.useState<number | null>(null);
  const [checkAV, setCheckAV] = React.useState<boolean>(false);
  const [checkAH, setCheckAH] = React.useState<boolean>(true);
  const [somaTotalParaTabela, setSomaTotalParaTabela] = React.useState<
    number[]
  >(Array(12).fill(0));
  const [AHparaTabela, setAHparaTabela] = React.useState<number[]>([]);

  const meses = [
    "JAN",
    "FEV",
    "MAR",
    "ABR",
    "MAI",
    "JUN",
    "JUL",
    "AGO",
    "SET",
    "OUT",
    "NOV",
    "DEZ",
  ];

  const anosDisponiveis =
    statesDRE.Dre && statesDRE.Dre[0]
      ? Object.keys(statesDRE.Dre[0]).map(Number)
      : [];

  const [anoSelecionado, setAnoSelecionado] = React.useState<number>(
    anosDisponiveis.length > 0 ? anosDisponiveis[0] : new Date().getFullYear()
  );

  const subcontasDisponiveis =
    statesDRE.Dre && statesDRE.Dre[0] && statesDRE.Dre[0][anoSelecionado]
      ? Object.keys(statesDRE.Dre[0][anoSelecionado])
      : [];

  React.useEffect(() => {
    dispatch(getDRE());
  }, [dispatch]);

  React.useEffect(() => {
    if (statesDRE.success_Dre && statesDRE.Dre.length > 0) {
      const somaTotal = Array(12).fill(0);
      for (let i = 0; i < 12; i++) {
        somaTotal[i] = subcontasDisponiveis.reduce((sum, subconta) => {
          return sum + (statesDRE.Dre[0][anoSelecionado]?.[subconta]?.[i] || 0);
        }, 0);
      }
      setSomaTotalParaTabela(somaTotal);
    }
  }, [anoSelecionado, statesDRE.Dre]);

  React.useEffect(() => {
    if (index1AH != null && index2AH != null) {
      const novoAH = subcontasDisponiveis.map((subconta) => {
        const valor1 =
          statesDRE.Dre[0][anoSelecionado]?.[subconta]?.[index1AH] || 0;
        const valor2 =
          statesDRE.Dre[0][anoSelecionado]?.[subconta]?.[index2AH] || 0;
        return valor2 !== 0 ? ((valor1 - valor2) / valor2) * 100 : valor1;
      });
      setAHparaTabela(novoAH);
    }
  }, [index1AH, index2AH, anoSelecionado, statesDRE.Dre]);

  const getAnaliseVertical = (
    LINHAn_COLUNAn: number,
    TOTALn: number
  ): number => {
    return TOTALn !== 0 ? (LINHAn_COLUNAn / TOTALn) * 100 : 0;
  };

  const handleAH = (indexValor: number) => {
    try {
      if (index1AH == null && checkAH) {
        setIndex1AH(indexValor);
      } else if (index2AH == null && checkAH) {
        if (index1AH != null && indexValor > index1AH) {
          setIndex2AH(index1AH);
          setIndex1AH(indexValor);
        } else {
          setIndex2AH(indexValor);
        }
      } else {
        setIndex1AH(null);
        setIndex2AH(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!statesDRE.success_Dre) {
    return (
      <ContainerDERPS>
        <h1>DRE</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Skeleton height={40} width="30%" />
          <Skeleton height={40} width="100%" />
        </div>
      </ContainerDERPS>
    );
  }

  return (
    <ContainerDERPS>
      <h1>DRE</h1>

      <BoxYear>
        <p>Ano Referência:</p>
        <select
          value={anoSelecionado}
          onChange={(e) => {
            setAnoSelecionado(Number(e.target.value));
            setIndex1AH(null);
            setIndex2AH(null);
          }}
        >
          {anosDisponiveis.map((ano) => (
            <option key={ano} value={ano}>
              {ano}
            </option>
          ))}
        </select>
        <span>
          <p
            style={
              !checkAV
                ? { opacity: 0.3, padding: "5px" }
                : {
                    backgroundColor: "rgb(255, 0, 132,10%)",
                    padding: "5px",
                    borderRadius: "5px",
                  }
            }
          >
            Análise Vertical {`(A.V)`}{" "}
          </p>
          {checkAV ? (
            <FaCheck onClick={() => setCheckAV(!checkAV)} />
          ) : (
            <div
              style={{
                padding: "7px",
                content: "",
                border: "1px solid blueviolet",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => setCheckAV(!checkAV)}
            />
          )}
        </span>
        <span>
          <p
            style={
              !checkAH
                ? { opacity: 0.3, padding: "5px" }
                : {
                    backgroundColor: "rgb(255, 0, 132,10%)",
                    padding: "5px",
                    borderRadius: "5px",
                  }
            }
          >
            Análise Horizontal {`(A.H)`}{" "}
          </p>
          {checkAH ? (
            <FaCheck onClick={() => setCheckAH(!checkAH)} />
          ) : (
            <div
              style={{
                padding: "7px",
                content: "",
                border: "1px solid blueviolet",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => setCheckAH(!checkAH)}
            />
          )}
        </span>
      </BoxYear>

      <table>
        <thead>
          <tr>
            <th>Sub Contas</th>
            {meses.map((mes, index) => (
              <React.Fragment key={index}>
                <th className="MES-HEAD">{mes}</th>
                {checkAV && <th>A.V</th>}
              </React.Fragment>
            ))}
            {checkAH && <th>A.H</th>}
          </tr>
        </thead>
        <tbody>
          {subcontasDisponiveis.length === 0 ? (
            <tr>
              <td colSpan={meses.length + 1}>
                <Skeleton height={30} width="100%" />
              </td>
            </tr>
          ) : (
            subcontasDisponiveis.map((subconta, indexSubconta) => (
              <tr key={subconta}>
                <td>{subconta.toUpperCase()}</td>
                {statesDRE.Dre[0][anoSelecionado][subconta].map(
                  (valor, indexValor) => (
                    <React.Fragment key={indexValor}>
                      <td
                        onClick={() => handleAH(indexValor)}
                        className={`values ${
                          indexValor === index1AH
                            ? "index1AH"
                            : indexValor === index2AH
                            ? "index2AH"
                            : ""
                        }`}
                      >
                        {!checkAV ? `$  ${valor}` : valor}
                      </td>
                      {checkAV && (
                        <td className="AV">
                          {getAnaliseVertical(
                            valor,
                            somaTotalParaTabela[indexValor]
                          ).toFixed(2)}{" "}
                          %
                        </td>
                      )}
                    </React.Fragment>
                  )
                )}
                {checkAH && (
                  <td className="AH">
                    {AHparaTabela[indexSubconta] !== undefined
                      ? AHparaTabela[indexSubconta].toFixed(2)
                      : 0}
                    %
                  </td>
                )}
              </tr>
            ))
            
          )}
              <tr className="total_footer">
            <td>Total</td>
            {somaTotalParaTabela.map((value, index) => (
              <>
              <td key={index} className="color-pink">
                $ {value}
              </td>
{ checkAV &&      <td>100%</td>
}              </>
            ))}
          </tr>

      
        </tbody>
      </table>
    </ContainerDERPS>
  );
};
export default DREP;
