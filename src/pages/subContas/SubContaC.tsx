  import React, { useState, useEffect } from "react";
  import { useSelector } from "react-redux";
  import { RootState } from "../../store";
  import { FaPencilAlt, FaPlusSquare } from "react-icons/fa";
  import { AiTwotoneDelete } from "react-icons/ai";
  import {  toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import {
    ContainerSubContasCS,
    ContainerRegistration,
    Pagination,
    ModalOverlay,
    ModalContent,
    ModalOverlayDelete,
    ModalContentDelete,
  } from "./SubConta.styled";
  import { CustomTsDispatch } from "../../hooks/dispatch";
  import { getInfosGerais } from "../../slices/infosGerais";
  import {
    deleteSubConta,
    newSubConta,
    updateSubConta,
  } from "../../slices/SubContaSL";

  const SubContaC = () => {
    const dispatch = CustomTsDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newSubCont, setNewSubCont] = useState<string>("");
    const [typeDespesa, setTypeDespesa] = useState<string>("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [selectedSubContaIndex, setSelectedSubContaIndex] = useState<
      number | null
    >(null);

    const itemsPerPage = 7;

    useEffect(() => {
    const month = new Date().toISOString().slice(0, 7);
    dispatch(getInfosGerais(month));
    }, [dispatch]);

    const subContasFromInfoGerais = useSelector(
      (state: RootState) => state.infosGeraisStore.infosGerais?.sub_contas || []
    );

    const currentSubContas = subContasFromInfoGerais.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(subContasFromInfoGerais.length / itemsPerPage);

    const openModal = (isEdit = false, index: number | null = null) => {
      setIsEditing(isEdit);
      setShowModal(true);
      setSelectedSubContaIndex(index);
    };

    const handleDeleteConfirmation = (index: number) => {
      setSelectedSubContaIndex(index);
      setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
      if (selectedSubContaIndex !== null) {
        dispatch(
          deleteSubConta({ subConta: newSubCont, id: selectedSubContaIndex })
        )
          .then(() => {
            toast.success("Sub-conta excluída com sucesso!");
          })
          .catch(() => {
            toast.error("Erro ao excluir a sub-conta.");
          });
      }
      setShowDeleteConfirm(false);
      setSelectedSubContaIndex(null);
    };

    const handleSubmit = () => {
      if (!newSubCont.trim()) {
        toast.error("Preencha o nome da sub-conta!");
        return;
      }
    
      if (isEditing && selectedSubContaIndex !== null) {
        dispatch(
          updateSubConta({
            id: selectedSubContaIndex,
            novaSubConta: newSubCont,
            subContaExistente: currentSubContas[selectedSubContaIndex].nome,
          })
        )
          .then(() => {
            toast.success("Sub-conta atualizada com sucesso!");
                const month = new Date().toISOString().slice(0, 7);
                dispatch(getInfosGerais(month));
          })
          .catch(() => {
            toast.error("Erro ao atualizar sub-conta.");
          });
      } else {
        dispatch(newSubConta({ nome: newSubCont, tipo: typeDespesa }))
          .then(() => {
            toast.success("Sub-conta adicionada com sucesso!");
            const month = new Date().toISOString().slice(0, 7);
            dispatch(getInfosGerais(month));          })
          .catch(() => {
            toast.error("Erro ao adicionar sub-conta.");
          });
      }
    
      setShowModal(false);
    };
    

    return (
      <ContainerSubContasCS>
        <h1>Sub-Contas</h1>
        <ContainerRegistration>
          <div
            onClick={() => {
              openModal();
              setNewSubCont("");
            }}
            className="AddSubConta"
          >
            <FaPlusSquare />
            <p>Adicionar Sub-conta</p>
          </div>
        </ContainerRegistration>

        <h3>Sub-Contas Cadastradas</h3>
        <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo de Despesa</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {currentSubContas.map((subC, index) => (
            <tr key={index}>
              <td>{subC.nome}</td>
              <td>{subC.tipo === "FIXA" ? "Despesa Fixa" : "Despesa Variável"}</td>
              <td>
                <button onClick={() => openModal(true, (currentPage - 1) * itemsPerPage + index)}>
                  <FaPencilAlt />
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteConfirmation((currentPage - 1) * itemsPerPage + index)}>
                  <AiTwotoneDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          )}
        </Pagination>

        {showModal && (
          <ModalOverlay>
            <ModalContent>
              <h2>{isEditing ? "Editar Sub-conta" : "Nova Sub-conta"}</h2>
              <div>
                Nome da Sub-Conta
                <input
                  type="text"
                  value={newSubCont}
                  onChange={(e) => setNewSubCont(e.target.value.toUpperCase())}
                  placeholder="Insira o nome da sub-conta"
                />
              </div>

              <div >
                
                { !isEditing? <><label> Tipo da Despesa </label> <select
                  value={typeDespesa}
                  onChange={(e) => setTypeDespesa(e.target.value.toUpperCase())}
                >
                  <option value="" disabled>
                    Selecione o tipo
                  </option>
                  <option value="fixa">Despesa Fixa</option>
                  <option value="variavel">Despesa Variável</option>
                </select> </> : null }
              </div>
              
              <div className="Button">
                <button onClick={handleSubmit}>Salvar</button>
                <button
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </ModalContent>
          </ModalOverlay>
        )}

        {showDeleteConfirm && (
          <ModalOverlayDelete>
            <ModalContentDelete>
              <h2>Aviso</h2>
              <p>Deseja realmente excluir esta sub-conta?</p>
              <div className="Button">
                <button onClick={confirmDelete} className="confirm-btn">
                  Sim
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Não
                </button>
              </div>
            </ModalContentDelete>
          </ModalOverlayDelete>
        )}
      </ContainerSubContasCS>
    );
  };

  export default SubContaC;
