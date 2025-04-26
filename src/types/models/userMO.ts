export interface UserAfterLogin {
    funcao: string;
    email: string;
    nome : string;
    historicos: string;
} 
export interface UsersList  {
    id: string,
    nome: string,
    email: string,
    funcao: string,
    empresa :string;
    isActive : boolean;
    createdAt: Date,
    updatedAt: Date
}
export interface userDispatch {
    nome: string,
    email: string,
    funcao: string,
    senha: string,
}
  