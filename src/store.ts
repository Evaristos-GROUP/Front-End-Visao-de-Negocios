import { configureStore } from "@reduxjs/toolkit";

import RegistrationsSlice from "./slices/RegistrationsSL";
import infosGeraisSlice from "./slices/infosGerais";
import AuthSlice from "./slices/AuthSL";
import UserSL from "./slices/UserSL";
import SubContaSL from "./slices/SubContaSL";
import FonteArrecadacaoSL from "./slices/FonteArrecadacaoSL";
import DRESL from "./slices/Relatorios/DRESL";
import MargemDeLucroSL from "./slices/Relatorios/MargemDeLucroSL";
import CaixaSlice from "./slices/CaixaSL";

export const store = configureStore({
  reducer: {
    authStore: AuthSlice,
    registrationsStore: RegistrationsSlice,
    infosGeraisStore: infosGeraisSlice,
    userStore: UserSL,
    subcontaStore: SubContaSL,
    fonteArrecadacaoStore: FonteArrecadacaoSL,
    DRESTore: DRESL,
    MargemDeLucroStore: MargemDeLucroSL,
    CaixaStore: CaixaSlice,
  },
});

export type CustomDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
