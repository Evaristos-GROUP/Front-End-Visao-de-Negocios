import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/AuthSL";
import { ContainerNavbarCS, BoxoptionsCS } from "./navbar.styled";
import { FcSms, FcAssistant, FcSettings } from "react-icons/fc";
import { IoMdArrowDropright } from "react-icons/io";
import { toast } from "react-toastify";

const NavbarC: React.FC = (): React.ReactElement => {
  const [showUserOptions, setShowUserOptions] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  const [email, nome, funcao] = userData ? userData.split("|") : ["", "", ""];

  const handleLogout = async () => {
    try {
      await dispatch<any>(logout()).unwrap(); // Usa <any> para evitar erro de tipo
      toast.success("Logout realizado com sucesso!");
      navigate("/"); // Redireciona para a tela de login
    } catch (error) {
      toast.error("Erro ao fazer logout. Tente novamente.");
    }
  };

  return (
    <ContainerNavbarCS keyNav={showUserOptions}>
      <ul>
        <li>
          <span>
            <FcSms />
          </span>
        </li>

        <li>
          <span>{nome.trim().charAt(0).toUpperCase()}</span>
        </li>

        <li onClick={() => setShowUserOptions(!showUserOptions)}>
          <span>
            <p>{nome}</p> <IoMdArrowDropright />
          </span>
        </li>

        <BoxoptionsCS keyNav={showUserOptions}>
          <div>
            <span><FcSettings /> <p>Configurações</p></span>
            <span><FcAssistant /> <p>Suporte</p></span>
          </div>
          <div onClick={handleLogout} style={{ cursor: "pointer" }}>
            <p>Logout</p>
          </div>
        </BoxoptionsCS>
      </ul>
    </ContainerNavbarCS>
  );
};

export default NavbarC;
