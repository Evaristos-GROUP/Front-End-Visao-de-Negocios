import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt, FaUserPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CustomTsDispatch } from "../../hooks/dispatch";
import {
  addNewUser,
  getAllUsers,
  inactiveAUser,
  updateAUser,
} from "../../slices/UserSL";
import {
  ContainerUsersCS,
  ContainerRegistration,
  Pagination,
  ModalOverlay,
  ModalContent,
  ButtonBall,
  ModalOverlayDelete,
  ModalContentDelete,
} from "./Users.styled";
import { userDispatch, UsersList } from "../../types/models/userMO";

const UsersC: React.FC = () => {
  const dispatch = CustomTsDispatch();
  const { userList } = useSelector((state: RootState) => state.userStore);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<userDispatch>({ nome: "", funcao: "", email: "", senha: "" });
  const [newUpdatedUser, setNewUpdatedUser] = useState<{id: string, nome: string, funcao: string, email: string }>({id : "", nome: "", funcao: "", email: "" });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  const currentUsers = userList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(userList.length / itemsPerPage);

  const handleAddUser = (): void => {
    setShowModal(true);
    setIsEditing(false);
    setNewUser({ nome: "", funcao: "", email: "", senha: "" });
  };

  const handleEditUser = (user: UsersList, id: string): void => {
    setSelectedUserId(id);
    setNewUpdatedUser({
      id: user.id,
      nome: user.nome,
      funcao: user.funcao,
      email: user.email
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteUser = (userId: string): void => {
    setSelectedUserId(userId);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteUser = (): void => {
    if (selectedUserId) {
      dispatch(inactiveAUser(selectedUserId));
      toast.success("Operação realizada com sucesso!");
    }
    setShowDeleteConfirm(false);
    setSelectedUserId(null);
  };

  const handleModalClose = (): void => {
    setShowModal(false);
    setIsEditing(false);
    setNewUser({ nome: "", funcao: "", email: "", senha: "" });
    setNewUpdatedUser({ id: "", nome: "", funcao: "", email: "" });
    setSelectedUserId(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    if (isEditing) {
      setNewUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
    } else {
      setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
  };
  
  const userExists = userList.some((user) => user.email === newUser.email);

  const handleSubmit = async (): Promise<void> => {
    if (isEditing && selectedUserId) {
      if (!newUpdatedUser.nome || !newUpdatedUser.email || !newUpdatedUser.funcao) {
        toast.error("Preencha todos os campos!");
        return;
      }
  
      try {
        await dispatch(updateAUser(newUpdatedUser));
        toast.success("Usuário atualizado com sucesso!");
        handleModalClose();
      } catch (error) {
        toast.error("Erro ao atualizar usuário. Tente novamente!");
        handleModalClose();
      }
    } else {
      if (!newUser.nome || !newUser.email || !newUser.funcao || !newUser.senha) {
        toast.error("Preencha todos os campos!");
        return;
      }
  
      if (userExists) {
        toast.error("Este e-mail já está cadastrado!");
        return;
      }
  
      try {
        await dispatch(addNewUser(newUser));  
        dispatch(getAllUsers());
        toast.success("Usuário adicionado com sucesso!");
        handleModalClose();
      } catch (error) {
        toast.error("Erro ao adicionar usuário. Tente novamente!");
      }
    }
  };
  
  
  

  return (
    <ContainerUsersCS>
      <ToastContainer />
      <h1>Usuários</h1>
      <ContainerRegistration>
        <div onClick={handleAddUser} className="AddUsuario">
          <FaUserPlus />
          <p>Adicionar Usuário</p>
        </div>
      </ContainerRegistration>

      <h3>Usuários Cadastrados </h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Acesso</th>
            <th>E-mail</th>
            <th>Editar</th>
            <th>Desativar/Ativar</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.funcao.toUpperCase()}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEditUser(user, user.id)}>
                  <FaPencilAlt />
                </button>
              </td>
              <td>
                <ButtonBall isActive={user.isActive} onClick={() => handleDeleteUser(user.id)}>
                </ButtonBall>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} className={currentPage === page ? "active" : ""} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
      </Pagination>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <h2>{isEditing ? "Editar Usuário" : "Adicionar Usuário"}</h2>
            <form>
              <label>Nome</label>
              <input
                type="text"
                name="nome"
                value={isEditing ? newUpdatedUser.nome : newUser.nome}
                onChange={handleFormChange}
              />
              <label>Função</label>
              <select
                name="funcao"
                value={isEditing ? newUpdatedUser.funcao : newUser.funcao}
                onChange={handleFormChange}
              >
                <option value="">Selecione uma função</option>
                <option value="GERENTE">Gerente</option>
                <option value="ANALISTA">Analista</option>
                <option value="SOCIO">Socio</option>
              </select>
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                value={isEditing ? newUpdatedUser.email.toLowerCase() : newUser.email.toLowerCase()}
                onChange={handleFormChange}
              />
              {!isEditing && (
                <>
                  <label>Senha</label>
                  <input
                    type="password"
                    name="senha"
                    value={newUser.senha}
                    onChange={handleFormChange}
                  />
                </>
              )}
            </form>
            <div className="Button">
              <button onClick={handleSubmit} className="confirm-btn">{isEditing ? "Atualizar" : "Adicionar"}</button>
              <button onClick={handleModalClose} className="cancel-btn">Cancelar</button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

      {showDeleteConfirm && (
        <ModalOverlayDelete>
          <ModalContentDelete>
            <h2>Aviso</h2>
            <p>Deseja realmente prosseguir?</p>
            <div className="Button">
              <button onClick={confirmDeleteUser} className="confirm-btn">Sim</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="cancel-btn">Não</button>
            </div>
          </ModalContentDelete>
        </ModalOverlayDelete>
      )}
    </ContainerUsersCS>
  );
};

export default UsersC;