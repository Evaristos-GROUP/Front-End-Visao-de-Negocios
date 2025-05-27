import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import { toast } from "react-toastify"; // Para exibir mensagens de erro/sucesso
import { BoxEmailEnviado, ContainerEmailEnviado } from "./emailEnviado.styled"; // Estilização opcional
import { CustomTsDispatch } from "../../../hooks/dispatch"; // Importando dispatch para enviar ação
import { forgotPassword } from "../../../slices/AuthSL"; // Função de recuperação de senha
import { useSelector } from "react-redux"; // Usando o hook useSelector
import { RootState } from "../../../store";

const EmailEnviado = () => {
  const navigate = useNavigate();
  const dispatch = CustomTsDispatch();
  const [email, setEmail] = React.useState("");
  const statesAUTH = useSelector((state: RootState) => state.authStore);

  const handleSenhaAlterada = () => {
    navigate("/login");
  };

  const handleReenviarValidacao = async () => {
    if (!email) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (statesAUTH.success_auth) {
      toast.success(statesAUTH.success_auth);
      setTimeout(() => {
        navigate("/email-enviado");
      }, 2000);
    } else if (statesAUTH.error_auth) {
      toast.error(statesAUTH.error_auth);
    }
  }, [statesAUTH, navigate]);

  return (
    <ContainerEmailEnviado>
      <BoxEmailEnviado>
        <form className="form">
          <h2>Email enviado com sucesso!</h2>
          <p>
            Verifique o seu E-MAIL para dar continuidade na sua alteração de
            senha.
          </p>

          <div className="Button">
            <button onClick={handleSenhaAlterada}>Senha alterada</button>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <button onClick={handleReenviarValidacao}>
              Reenviar validação de senha
            </button>
          </div>
        </form>
      </BoxEmailEnviado>
    </ContainerEmailEnviado>
  );
};

export default EmailEnviado;
