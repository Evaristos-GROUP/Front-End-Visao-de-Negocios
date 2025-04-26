import * as React from "react";
import * as Redux from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { RootState } from "../../store";
import {
  despesasModel,
  recebiveisModel,
  vendasModel,
} from "../../types/Models";
import { ContainerTableCS } from "./table.styled";
import ShowDescriptionM from "../../modals/showDescription/ShowDescriptionM";
import AlertC from "../alert/AlertC";

interface propsTable {
  registrationType: string | null; 
  filterName: string;
}

const TableC: React.FC<propsTable> = ({ registrationType, filterName }) => {
  const allData = Redux.useSelector(
    (state: RootState) => state.registrationsStore
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showDescriptionModal, setShowDescriptionModal] = React.useState(false);
  const [showAlertDelete, setShowAlertDelete] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<
    recebiveisModel | despesasModel | vendasModel | null
  >(null);

  const itemsPerPage = 5;

  const dataMap = {
    RECEBIVEIS: allData.stateRecebiveis.recebiveis,
    DESPESAS: allData.stateDespesas.despesas,
    VENDAS: allData.stateVendas.vendas,
  };

  const data = dataMap[registrationType as keyof typeof dataMap] || [];
  
  const filteredItems = data.filter((item) =>
    item.type.toLowerCase().includes(filterName.toLowerCase())
  );
  const totalPages = Math.max(
    Math.ceil(filteredItems.length / itemsPerPage),
    1
  );
  const itemsToDisplay = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterName, registrationType]);

  console.log(dataMap.RECEBIVEIS)

  return (
    <ContainerTableCS>
      <table>
        <thead>
          <tr>
            <th>Valor</th>
            <th>
              {registrationType === "DESPESAS"
                ? "Sub Conta"
                : "Fonte de Arrecadação"}
            </th>
            <th>Data</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((item, index) => (
              <tr key={index}>
                <td>R$ {item.valor}</td>
                <td>
                  {registrationType === "DESPESAS" && "sub_conta" in item
                    ? item.sub_conta
                    : "fonte_de_arrecadacao" in item && (
                          <span>{item.fonte_de_arrecadacao}</span>
                      )}
                </td>
                <td>{item.dataReferencia.toString()}</td>
                <td>
                  <FaPencilAlt
                    onClick={() => {
                      setShowDescriptionModal(true);
                      setSelectedItem(item);
                    }}
                  />
                </td>
                <td>
                  <AiTwotoneDelete
                    onClick={() => {
                      setShowAlertDelete(true);
                      setSelectedItem(item);
                    }}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                Nenhum item encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginação */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </button>
          )
        )}
      </div>

      {/* Modais */}
      {showDescriptionModal && selectedItem && (
        <ShowDescriptionM
          item={selectedItem}
          showModal={() => setShowDescriptionModal(false)}
        />
      )}

      {showAlertDelete && selectedItem && (
        <AlertC
          keyModel={registrationType || ''}
          option={2}
          item={selectedItem}
          showAlert={() => setShowAlertDelete(false)}
          handleSubmit={() => null}
        />
      )}
    </ContainerTableCS>
  );
};

export default TableC;
