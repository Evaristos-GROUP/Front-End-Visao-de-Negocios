import * as React from "react";
import { FcPaid, FcPositiveDynamic, FcExport } from "react-icons/fc";
import { Chart } from "react-google-charts";
import {
  ContainerDashboardPS,
  BoxDashboardPS,
  BoxContentPs,
  BoxDashboardChartsPS,
  BoxContentChartsPS,
} from "./dashboard.styled";

import entrada from "../../assets/receive-amount.png";
import vendas from "../../assets/sales.png";
import saida from "../../assets/accounting.png";
import { CustomTsDispatch } from "../../hooks/dispatch";
import { getInfosGerais } from "../../slices/infosGerais";
import * as Redux from "react-redux";
import { RootState } from "../../store";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import {
  informacoesGeraisParaOFrontModel,
  lancamentoGenerico,
} from "../../types/models/infosGeraisMO";
import CaixaC from "../../components/caixa/CaixaC";
const DashboardP: React.FC = (): React.ReactElement => {

  const stateInfoGerais = Redux.useSelector(
    (state: RootState) => state.infosGeraisStore
  );
  const dispatch = CustomTsDispatch();

  React.useEffect(() => {
    
    const month = new Date().toISOString().slice(0, 7);
    dispatch(getInfosGerais(month));

    if (typeof stateInfoGerais.error_infoGerais === "string") {
      toast.error(stateInfoGerais.error_infoGerais);
    }
  }, []);


 
  const dataPie = [
    ["Ultimos meses", "Hours per Day"],
    ["Recebíveis", stateInfoGerais.infosGerais?.dashboard.totalRecebiveisPorRange || undefined],
    ["Vendas", stateInfoGerais.infosGerais?.dashboard.totalVendasPorRange || undefined],
    ["Despesas", stateInfoGerais.infosGerais?.dashboard.totalDespesasPorRange || undefined],
  ];

  

  type DashboardForStructs = {
    despesas: lancamentoGenerico[];
    vendas: lancamentoGenerico[];
    recebiveis: lancamentoGenerico[];
  };

  function ajustarDataParaLocal(dataStr: string) {
    const date = new Date(dataStr);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset()); // Ajuste para UTC puro
    return date.toISOString().split("T")[0]; // Retorna "YYYY-MM-DD"
  }


  
  const preencheDataLineChart = (dashboard: DashboardForStructs | undefined) => {
    if (!dashboard) return [["Day/Month", "Recebíveis", "Vendas", "Despesas"]];
  
    const data: (string | number)[][] = [["Day/Month", "Recebíveis", "Vendas", "Despesas"]];
    const categorias = ["recebiveis", "vendas", "despesas"] as const;
  
    const dias = new Set(
      categorias.flatMap((categoria) =>
        dashboard[categoria].map((t) => {
          const dia = ajustarDataParaLocal(t.data);
          if (!dia) {
            console.error(`Data inválida em ${categoria}:`, t.data);
            return null;
          }
          return dia;
        }).filter(Boolean)
      )
    );
  
    dias.forEach((dia) => {
      const [year, month, day] = dia.split("-");
  
      const valores = categorias.map((categoria) =>
        dashboard[categoria]
          .filter((t) => ajustarDataParaLocal(t.data) === dia)
          .reduce((acc, cur) => acc + cur.valor, 0)
      );
  
      data.push([`${day}/${month}`, ...valores]);
    });
  
    return data;
  };
  
  const preencheDataColumChart = (info: informacoesGeraisParaOFrontModel | undefined) => {
    if (info !== undefined && info !== null) {
      const data: (string | number)[][] = [["Dia", "Valor"]];
  
      info.caixa.totalPorDia.forEach((t) => {
        const diaFormatado = ajustarDataParaLocal(t.data);
  
        if (!diaFormatado) {
          console.error("Data inválida em caixa:", t.data);
        } else {
          data.push([`${diaFormatado.split("-").reverse().join("/")}`, t.valor]);
        }
      });
  
      return data;
    }
  
    return [["Dia", "Valor"]];
  };

  
  const dataLineChart = preencheDataLineChart(stateInfoGerais.infosGerais?.dashboard);
  const dataColumChart = preencheDataColumChart(stateInfoGerais.infosGerais);
  const optionsColumChart = {
  
    hAxis: {
      textStyle: { color: "white" },
    },
    vAxis: {
      gridlines: {
        color: "none",
      },
      textStyle: { color: "#ffffff" },
    },
    backgroundColor: "none",
    isStacked: true,
    legend: { position: "none" },
    colors: ["orangered"],
    bar: {
      groupWidth: "50%",
    },
  };

  const optionsLineChart = {
    
    legend: { position: "bottom", textStyle: { color: "#ffffff" } },
    colors: ["#2EFF43", "#2EFFFF", "#FF3939"],

    backgroundColor: "none",
    
    hAxis: {
      gridlines: {
        color: "none ",
      },
      textStyle: { color: "#ffffff" },
    },
    vAxis: {
      gridlines: {
        color: "none",
      },
      textStyle: { color: "#ffffff" },
    },
  };

  const optionsChartPie = {
 
    is3D: true,
    backgroundColor: "none",
    color: "#ffffff",
    legend: {
      position: "bottom",
      textStyle: { color: "#ffffff" },
    },
    
  };

  return (
    <ContainerDashboardPS>


<CaixaC info={stateInfoGerais.infosGerais}/>


      <BoxDashboardPS>

        <BoxContentPs colorString="#2EFF43">
          <span>
            <p>Recebíveis</p> <FcPaid />
          </span>

          <span>
            <p> R$</p>
            {stateInfoGerais.infosGerais?.dashboard !== undefined ? (
              <p>{stateInfoGerais.infosGerais?.dashboard.recebivel_total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            ) : (
              <Skeleton style={{ margin: "10px", padding: "5px" }} />
            )}
          </span>
          <img src={entrada} alt="check" />
        </BoxContentPs>

        <BoxContentPs colorString="#2EFFFF">
          <span>
            <p>Vendas</p> <FcPositiveDynamic />
          </span>

          <span>
            <p> R$</p>{" "}
            {stateInfoGerais.infosGerais?.dashboard !== undefined ? (
              <p>{stateInfoGerais.infosGerais?.dashboard.venda_total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            ) : (
              <Skeleton style={{ margin: "10px", padding: "5px" }} />
            )}
          </span>

          <img src={vendas} alt="check" />
        </BoxContentPs>

        <BoxContentPs colorString="#FF3939">
          <span>
            <p>Despesas</p> <FcExport />
          </span>

          <span>
            <p> R$</p>
            {stateInfoGerais.infosGerais?.dashboard !== undefined ? (
              <p>{stateInfoGerais.infosGerais?.dashboard.despesa_total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            ) : (
              <Skeleton style={{ margin: "10px", padding: "5px" }} />
            )}
          </span>

          <img src={saida} alt="check" />
        </BoxContentPs>
      </BoxDashboardPS>

      <BoxDashboardPS>
        <BoxContentChartsPS
          style={{
            display: stateInfoGerais.infosGerais?.dashboard !== undefined ? "flex" : "block",
          }}
        >
          <span>
            {stateInfoGerais.infosGerais?.dashboard !== undefined ? (
              <>
         
                       <p>Representatividade</p>
                <BoxDashboardChartsPS>
   
                  <Chart
                  
                    chartType="PieChart"
                    data={dataPie}
                    options={optionsChartPie}
                    width={"100%"}
                    height={"100%"}
                  />
      
                </BoxDashboardChartsPS>
                <p>Últimos 7 dias</p>
              </>
            ) : (
              <BoxDashboardChartsPS style={{ display: "none" }}>
                <Skeleton
                  style={{
                    height: "100%",
                    width: " 100%",
                  }}
                />
                <p>Últimos 7 dias</p>
              </BoxDashboardChartsPS>
            )}
          </span>
          <span>
            {stateInfoGerais.infosGerais?.dashboard !== undefined ? (
              <>
                     <p>Volatilidade</p>
                <BoxDashboardChartsPS className="bug">
                  
                  <Chart
                    chartType="LineChart"
                    width={"100%"}
                    height={"100%"}
                    data={dataLineChart}
                    options={optionsLineChart}
                  />
      
                </BoxDashboardChartsPS>
                <p>Últimos 7 dias</p>
              </>
            ) : (
              <BoxDashboardChartsPS style={{ display: "block" }}>
                <Skeleton
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </BoxDashboardChartsPS>
            )}
          </span>
        </BoxContentChartsPS>
      </BoxDashboardPS>

      <BoxDashboardPS>
        <BoxContentChartsPS>
          
          <span className="onlyChild">
          <p>Acompanhamento semanal do caixa.</p>
            <BoxDashboardChartsPS>
              <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={dataColumChart}
                options={optionsColumChart}
              />
            </BoxDashboardChartsPS>

          </span>
        </BoxContentChartsPS>
      </BoxDashboardPS>
    </ContainerDashboardPS>
  );
};

export default DashboardP;
