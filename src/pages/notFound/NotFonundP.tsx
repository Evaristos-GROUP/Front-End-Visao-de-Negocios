import React from "react";
import { Link } from "react-router-dom";
import error404 from "../../assets/error-404.webp";
import { ContentNotFound, LinkContent } from "./NotFound.styled";

const NotFoundP: React.FC = () => {
  return (
    <ContentNotFound>

        <img src={error404} alt="Erro 404 - Página não encontrada" />

      <div>
        <h1>404 - Infelizmente algo não saiu como esperado !!!</h1>
        <p>Tente novamente mais tarde, caso o erro persista entre em contato com o suporte.</p>
        <LinkContent>
          <Link to="/">Voltar para o início</Link>
        </LinkContent>
      </div>
    </ContentNotFound>
  );
};

export default NotFoundP;
