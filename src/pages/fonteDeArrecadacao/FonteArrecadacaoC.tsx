import React, { useState, useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaPencilAlt, FaPlusSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  deleteFonteArrecadacao,
  newFonteArrecadacao,
  updateFonteArrecadacao,
} from "../../slices/FonteArrecadacaoSL";
import {
  ContainerFonteArrecadacao,
  ContainerRegistration,
  Pagination,
  ModalOverlay,
  ModalContent,
  ModalOverlayDelete,
  ModalContentDelete,
} from "./FonteArrecadacao.styled";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getInfosGerais } from "../../slices/infosGerais";
import { CustomTsDispatch } from "../../hooks/dispatch";
import RelatoriosSE from "../../services/RelatoriosSE";

const FonteArrecadacaoC = (): React.ReactElement => {
  const dispatch = CustomTsDispatch();


  const fontesArrecadacaoFromInfosGerais = useSelector(
    (state: RootState) => state.infosGeraisStore.infosGerais?.fonte_arrecadacoes || []
  );
  const fonteArrecadacaoStates = useSelector(
    (state: RootState) => state.fonteArrecadacaoStore
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newFonte, setNewFonte] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFonteIndex, setSelectedFonteIndex] = useState<number | null>(null);

  useEffect(() => {
     const month = new Date().toISOString().slice(0, 7);
                  dispatch(getInfosGerais(month));
    RelatoriosSE.getDRE();
  }, [dispatch]);

  const totalPages = Math.ceil(fontesArrecadacaoFromInfosGerais.length / itemsPerPage);

  const openModal = (isEdit = false, index: number | null = null,) => {
    setIsEditing(isEdit);
    setShowModal(true);
    setSelectedFonteIndex(index);

  }

  const handleDeleteConfirmation = (index: number) => {
    setSelectedFonteIndex(index);
    setShowDeleteConfirm(true);

  };

  const confirmDeleteFonte = () => {
    try {
      if (selectedFonteIndex !== null) {
        dispatch(deleteFonteArrecadacao({ fonteArrecadacao: newFonte, id: selectedFonteIndex }));
        toast.success(fonteArrecadacaoStates.success_fonteArrecadacao);
      }
    } catch {
      console.log(fonteArrecadacaoStates.error_fonteArrecadacao)
      toast.success(fonteArrecadacaoStates.error_fonteArrecadacao);
    } finally {
      setShowDeleteConfirm(false);
      setSelectedFonteIndex(null);
    }

  };


  const currentFontes = fontesArrecadacaoFromInfosGerais.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handleSubmit = () => {
    if (!newFonte.trim()) {
      toast.error("Preencha o nome da sub-conta!");
      return;
    }

    if (isEditing && selectedFonteIndex !== null) {
      try {
        dispatch(updateFonteArrecadacao({
          id: selectedFonteIndex,
          novafonteArrecadacao: newFonte,
          fonteArrecadacaoExistente: currentFontes[selectedFonteIndex],
        }));
      } catch (error) {
        toast.error(fonteArrecadacaoStates.error_fonteArrecadacao);
      } finally {
        toast.success(fonteArrecadacaoStates.success_fonteArrecadacao);
      }
    } else {
      try {
        dispatch(newFonteArrecadacao({ fonteArrecadacao: newFonte }));
      } catch {
        toast.error(fonteArrecadacaoStates.error_fonteArrecadacao);
      } finally {
        toast.success(fonteArrecadacaoStates.success_fonteArrecadacao)
      }
    }
    setShowModal(false);
  };

  return (
    <ContainerFonteArrecadacao>
      <ToastContainer />
      <h1>Fontes de Arrecadação</h1>

      <ContainerRegistration>
        <div onClick={() => { openModal(), setNewFonte(''); }} className="AddFonteArrecadacao">
          <FaPlusSquare />
          <p>Adicionar Fonte de Arrecadação</p>
        </div>

      </ContainerRegistration>

      <h3>Fontes de arrecadação cadastradas</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {currentFontes.map((fonte, index) => (
            <tr key={index}>
              <td>{fonte}</td>
              <td>
                <button onClick={() => { openModal(true, (currentPage - 1) * itemsPerPage + index), setNewFonte(fonte) }}>
                  <FaPencilAlt />
                </button>
              </td>
              <td>
                <button onClick={() => { handleDeleteConfirmation((currentPage - 1) * itemsPerPage + index), setNewFonte(fonte) }}>
                  <AiTwotoneDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={currentPage === page ? "active" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </Pagination>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>{isEditing ? "Editar Fonte" : "Nova Fonte"}</h2>
            <label>
              Fonte de Arrecadação
              <input
                type="text"
                name="fonteArrecadacao"
                value={newFonte}
                onChange={(e) => setNewFonte(e.target.value.toUpperCase())}
                placeholder="Insira o nome da nova fonte de arrecadação"
              />
            </label>
            <div className="Button">
              <button onClick={handleSubmit}>Salvar</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
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
            <p>Deseja realmente excluir esta fonte de arrecadação?</p>
            <div className="Button">
              <button onClick={confirmDeleteFonte} className="confirm-btn">
                Sim
              </button>
              <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>
                Cancelar
              </button>
            </div>
          </ModalContentDelete>
        </ModalOverlayDelete>
      )}
    </ContainerFonteArrecadacao>
  );
};


export default FonteArrecadacaoC;
