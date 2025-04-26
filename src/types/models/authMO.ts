import { UserAfterLogin } from "./userMO";

export interface authModel {
  email: string;
  senha: string;
}

export interface authResponseLogin {

  token : string;
  user: UserAfterLogin;

}