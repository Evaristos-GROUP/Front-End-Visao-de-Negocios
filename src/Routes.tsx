import React from "react";
import { Route, Routes } from "react-router-dom";
import SidebarC from "./components/sidebar/SidebarC";
import DashboardP from "./pages/dashboard/DashboardP";
import NavbarC from "./components/navbar/NavbarC";
import RegistrationsP from "./pages/registrations/RegistrationsP";
import NotFoundP from "./pages/notFound/NotFonundP";

import * as Redux from "react-redux";
import { RootState } from "./store";
import AuthP from "../src/pages/Auth/login/AuthP";
import UsersC from "./pages/user/UsersC";
import SubContaC from "./pages/subContas/SubContaC";
import FonteArrecadacaoC from "./pages/fonteDeArrecadacao/FonteArrecadacaoC";
import DREP from "./pages/relatorios/dre/DREP";
import ForgotP from "./pages/Auth/forgot/Forgot";
import EmailEnviado from "./pages/Auth/Email-enviado/emailEnviadoP";
import MargemDeLucro from "./pages/relatorios/margemDeLucro/margemDeLucro";


const AppRoutes: React.FC = (): JSX.Element => {
  const authStates = Redux.useSelector((state: RootState) => state.authStore);
  return (
    <>
      {authStates.auth ? <NavbarC /> : null}
      {authStates.auth ? <SidebarC /> : null}
      <Routes>
        <Route
          path="/cadastros/fontes-arrecadacao"
          element={authStates.auth ? <FonteArrecadacaoC /> : <AuthP />}
        />

        <Route path="*" element={authStates.auth ? <NotFoundP /> : <AuthP />} />
        <Route
          path="/"
          element={authStates.auth ? <DashboardP /> : <AuthP />}
        />
        <Route
          path="/lancamentos"
          element={authStates.auth ? <RegistrationsP /> : <AuthP />}
        />

        <Route
          path="/cadastros/usuarios"
          element={authStates.auth ? <UsersC /> : <AuthP />}
        />
        <Route
          path="/cadastros/sub-contas"
          element={authStates.auth ? <SubContaC /> : <AuthP />}
        />
        <Route
          path="/relatorios/DRE"
          element={authStates.auth ? <DREP /> : <AuthP />}
        />
        <Route
          path="/relatorios/margem-lucro"
          element={authStates.auth ? <MargemDeLucro /> : <AuthP />}
        />

        <Route
          path="/auth/forgot-password"
          element={!authStates.auth ? <ForgotP /> : <AuthP />}
        />
           
        <Route path="/email-enviado" element={<EmailEnviado />} />

      </Routes>
    </>
  );
};

export default AppRoutes;
