import React from "react";
import { ContainerUnauthorized } from "./unauthorized.styled";
import { Link } from "react-router-dom";
import unauthorizedUser from "../../assets/unauthorizedUser.png";

const UnauthorizedP: React.FC = () => {
  return (
    <ContainerUnauthorized>
      <h2>
        <img style={{ width: "400px" }} src={unauthorizedUser} alt="" />
      </h2>
      <h1>Acesso Não Autorizado !!!</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <Link to="/">Voltar para o início</Link>
    </ContainerUnauthorized>
  );
};

export default UnauthorizedP;
