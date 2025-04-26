import * as React from "react";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { GiPayMoney } from "react-icons/gi";
import { TbReportMoney } from "react-icons/tb";

import {
  CardBoxContainer,
  CardBox,
  TabButtons,
  BoxTotalValues,
} from "./cardlist.styled"; // Importando os estilos corretamente
import { RootState } from "../../store";
import { servicos } from "../../types/models/Relatorios/MargemDeLucroMO";
import CardEdit from "../../modals/edit/margemDeLucro/CardEdit";
import CardCreated from "../../modals/created/margemDeLucro/CardCreated";
import Skeleton from "react-loading-skeleton";

const CardList = () => {
  const [tipoExibido, setTipoExibido] = React.useState("CONSULTA");
  const margemState = useSelector(
    (state: RootState) => state.MargemDeLucroStore
  );
  const [showEditCardModal, setShowEditCardModal] = React.useState(false);
  const [currentItemEditCardModal, setCurrentItemEditCardModal] =
    React.useState<servicos | null>(null);
  const [showCreatedCardModal, setShowCreatedCardModal] = React.useState(false);

  return (
    <CardBoxContainer>
      <TabButtons>
        <div>
          <button
            className={tipoExibido === "PROCEDIMENTO" ? "active" : ""}
            onClick={() => setTipoExibido("PROCEDIMENTO")}
          >
            Procedimentos/Exames
          </button>
          <button
            className={tipoExibido === "CONSULTA" ? "active" : ""}
            onClick={() => setTipoExibido("CONSULTA")}
          >
            Consultas
          </button>
        </div>
        
      <BoxTotalValues>
        <p>
          Total despesa fixa : <span>  R$ {margemState.MargemDeLucro?.totalDespesaFixa}</span>
        </p>
        <p>
          Total atendimentos geral : <span> {margemState.MargemDeLucro?.totalAtendimentos}</span>
        </p>
      </BoxTotalValues>

        <span onClick={() => setShowCreatedCardModal(!showCreatedCardModal)}>
          <FaPlusSquare />
          <p>Adicionar Serviço</p>
        </span>
      </TabButtons>

      <main>
        {margemState.MargemDeLucro &&
          margemState.MargemDeLucro.servicosPorTipo &&
          Array.isArray(
            margemState.MargemDeLucro.servicosPorTipo[tipoExibido]
          ) &&
          margemState.MargemDeLucro.servicosPorTipo[tipoExibido].map((item) => (
            <CardBox key={item.id} type={tipoExibido}>
              <FaEdit
                className="edit-icon"
                onClick={() => {
                  setCurrentItemEditCardModal(item);
                  setShowEditCardModal(!showEditCardModal);
                }}
              />
              <main className="header">
                <h4>
                  {!margemState.loading_MargemDeLucro ? (
                    item.nomeProcedimento
                  ) : (
                    <Skeleton
                      style={{ margin: "0px", padding: "2px", width: "90px" }}
                    />
                  )}
                </h4>
              </main>
              <p>
                Total Atendimentos : {!margemState.loading_MargemDeLucro ? (
                  item.qtdPorMes
                ) : (
                  <Skeleton
                    style={{ marginLeft: "3px", padding: "2px", width: "30px" }}
                  />
                )}
              </p>
              <div>
                <span className="spanbox" title="Valor de venda.">
                  <TbReportMoney />
                  <p>
                    R$ {!margemState.loading_MargemDeLucro ? (
                      item.valorVenda
                    ) : (
                      <Skeleton
                        style={{
                          margin: 0,
                          marginLeft: "4px",
                          padding: "2px",
                          width: "30px",
                        }}
                      />
                    )}
                  </p>
                </span>
                <span className="spanbox" title="Custo total.">
                  <GiPayMoney />
                  <p>
          
                    R$ {!margemState.loading_MargemDeLucro ? (
                      item.custoTotal.toFixed(2)
                    ) : (
                      <Skeleton
                        style={{
                          margin: 0,
                          marginLeft: "4px",
                          padding: "2px",
                          width: "30px",
                        }}
                      />
                    )}
                  </p>
                </span>
              </div>
              <span>
                <p> Margem de lucro</p>
                <p
                  className={
                    item.valorVenda > 0 &&
                    ((item.valorVenda - item.custoTotal) / item.valorVenda) *
                      100 <
                      0
                      ? "negativo"
                      : "positivo"
                  }
                >
                  {!margemState.loading_MargemDeLucro ? (
                    item.valorVenda === 0 ? (
                      "0%"
                    ) : (
                      `${(
                        ((item.valorVenda - item.custoTotal) /
                          item.valorVenda) *
                        100
                      ).toFixed(2)}%`
                    )
                  ) : (
                    <Skeleton
                      style={{ margin: "0px", padding: "2px", width: "90px" }}
                    />
                  )}
                </p>
              </span>
            </CardBox>
          ))}
      </main>

      {currentItemEditCardModal !== null && showEditCardModal && (
        <CardEdit
          item={currentItemEditCardModal}
          onEdit={() => {
            setCurrentItemEditCardModal(null);
            setShowEditCardModal(!showEditCardModal);
          }}
        />
      )}

      {showCreatedCardModal && (
        <CardCreated
          onClose={() => setShowCreatedCardModal(!showCreatedCardModal)}
        />
      )}
    </CardBoxContainer>
  );
};

export default CardList;
