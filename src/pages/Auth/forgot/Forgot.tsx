import * as React from "react";
import * as Redux from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; 
import { BoxForgot, ContainerForgot } from "./forgot.styled";
import { CustomTsDispatch } from "../../../hooks/dispatch";
import { forgotPassword } from "../../../slices/AuthSL";
import { RootState } from "../../../store";

const ForgotP = () => {
  const [email, setEmail] = React.useState("");
  const dispatch = CustomTsDispatch();
  const navigate = useNavigate(); 

  const statesAUTH = Redux.useSelector((state: RootState) => state.authStore);

  const handleForgotPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      toast.error("Por favor, insira um e-mail válido.");
      return;
    }

    dispatch(forgotPassword(email));

    if (statesAUTH.success_auth) {
      toast.success(statesAUTH.success_auth);
      setTimeout(() => {
        navigate("/email-enviado");
      }, 2000);
    } else if (statesAUTH.error_auth) {
      toast.error(statesAUTH.error_auth); 
    }
  };

  return (
    <ContainerForgot>
      <BoxForgot>
        <form className="form" onSubmit={handleForgotPassword}>
          <h2>Recuperar senha</h2>

          <div className="inputBox">
            <input
              type="email"
              required
              value={email.toLowerCase()}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>E-mail</span>
            <i></i>
          </div>

          <button type="submit">Enviar</button>

          <div className="links">
            <a
              href="https://api.whatsapp.com/send?phone=5511953096657"
              target="_blank"
              rel="noopener noreferrer"
            >
              Suporte
            </a>
          </div>
        </form>
      </BoxForgot>
    </ContainerForgot>
  );
};

export default ForgotP;
