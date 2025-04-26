import { SetStateAction, useState } from "react";

import logoCartao from "../../../assets/ct-logo.svg";
import logoOtica from "../../../assets/OTICA_LOGO.svg";
import logoHamonir from "../../../assets/LOGO_HAMONIR.svg";
import logoAmorSaude from "../../../assets/LOGOS AMOR SAUDE.svg";
import logoCdi from "../../../assets/Logo_CDI.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../../../slices/AuthSL";
import { CustomTsDispatch } from "../../../hooks/dispatch";
import { BoxLogin, ContainerLogin } from "./auth.styled";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthP = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const dispatch = CustomTsDispatch();
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await dispatch(login({ email, senha }));

      if (login.fulfilled.match(response)) {
        toast.success("Login bem-sucedido!");
        window.location.reload();
      } else {
        throw new Error("Falha no login");
      }
    } catch (error) {
      toast.error("E-mail e senha incorretos ou não cadastrados!!");
    }
  };

  return (
    <ContainerLogin>
      <BoxLogin>
        <form className="form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <div className="Logos">
            <img src={logoOtica} alt="Visão de todos" />
            <img src={logoCartao} alt="Cartão de todos" />
            <img src={logoAmorSaude} alt="Amor Saúde" />
            <img style={{ width: "30px" }} src={logoHamonir} alt="Hamonir" />
            <img src={logoCdi} alt="Cdi" />
          </div>

          <div className="inputBox">
            <input
              type="text"
              required
              value={email.toLowerCase()}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setEmail(e.target.value)
              }
            />
            <span>E-mail</span>
            <i></i>
          </div>

          <div className="inputBox">
            <input
              type="password"
              required
              value={senha}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setSenha(e.target.value)
              }
            />
            <span>Senha</span>
            <i></i>
          </div>

          <input type="submit" value="Login" />

          <div className="links">
            <Link to={"auth/forgot-password"}>Esqueceu a senha?</Link>
            <a href="https://api.whatsapp.com/send?phone=5511953096657">
              Suporte
            </a>
          </div>
        </form>
      </BoxLogin>

      <ToastContainer />
    </ContainerLogin>
  );
};

export default AuthP;
