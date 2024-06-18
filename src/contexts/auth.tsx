import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthRepository } from "../repositories/auth";
import { IUser, ISignInPayload, ISignUpPayload } from "../types/auth";

interface IValues {
  signed: boolean;
  user: IUser | undefined;
  signIn: (payload: ISignInPayload, rememberMe: boolean) => Promise<boolean>;
  signUp: (payload: ISignUpPayload) => Promise<boolean>;
  sendEmail: (payload: string) => Promise<boolean>;
  sendCode: (payload: string) => Promise<boolean>;
  sendPassword: (payload: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<IValues>({} as IValues);

interface IProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IProps) {
  const [id, setId] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");
  const [user, setUser] = useState<IUser | undefined>(undefined);
  const [signed, setSigned] = useState<boolean>(false);

  async function signIn(payload: ISignInPayload, rememberMe: boolean) {
    try {
      // envia o payload para o repositório fazer a requisição de signIn
      const data = await AuthRepository.signIn(payload);

      // retorna caso ocorra algum erro
      if (!data) return false;

      // verifica se o remember me ta marcado
      // caso esteja ele coloca as informações no localStorage
      // caso não esteja ele coloca as informações no sessionStorage
      /* 
        localStorage: dados ficam armazenados no navegador por tempo indefinido
        sessionStorage: dados ficam armazenados no navegador temporariamente
      */
      const storage = rememberMe ? localStorage : sessionStorage;

      // setta uma variável no local ou session storage chamada @auth:token
      // que armazena o token de autenticação do usuário
      storage.setItem("@auth:token", data.token);

      storage.setItem("@user:name", data.name);

      // redireciona o usuário para as telas autenticadas
      setSigned(true);

      return true;
    } catch (error) {
      console.error(`unable to login due to error: ${error}`);
    }

    return false;
  }

  async function signUp(payload: ISignUpPayload) {
    try {
      // envia o payload para o repositório fazer a requisição de signUp
      const data = await AuthRepository.signUp(payload);

      // retorna caso ocorra algum erro
      if (!data) return false;

      // salva o token no sessionStorage
      sessionStorage.setItem("@auth:token", data.token);

      console.log("sign-up data", data);
      
      // redireciona o usuário para as telas autenticadas
      setSigned(true);

      return true;
    } catch (error) {
      console.error(`unable to register due to error: ${error}`);
    }

    return false;
  }

  async function sendEmail(payload: string) {
    try {
      const data = await AuthRepository.sendEmail(payload);

      console.log("data.id",data.id);
      
      
      setId(data.id);
      
      return data;
    } catch (error) {
      console.error(`unable to send email due to error: ${error}`);
    }

    return false;
  }

  async function sendCode(payload: string) {
    try {
      const data = await AuthRepository.sendCode(id, payload);

      console.log("code token", data.token);

      setAuthToken(data.token);
      
      return data;
    } catch (error) {
      console.error(`unable to send code due to error: ${error}`);
    }

    return false;
  }

  async function sendPassword(payload: string) {
    try {
      const data = await AuthRepository.sendPassword(authToken, payload);

      sessionStorage.setItem("@auth:token", data.token);

      loadCredentials()
      
      return data;
    } catch (error) {
      console.error(`unable to send code due to error: ${error}`);
    }

    return false;
  }

  async function signOut() {
    // limpa os dados do usuário
    setUser(undefined);
    // limpa os dados da sessção
    sessionStorage.clear();
    // limpa os dados do armazenamento local
    localStorage.clear();
    // redireciona para as telas não autenticadas
    setSigned(false);
  }

  function loadData(storage: Storage): boolean {
    // carrega os dados armazenados no localStorage ou no sessionStorage
    const storagedToken = storage.getItem("@auth:token");

    if (!storagedToken) return false;

    setSigned(true);

    return true;
  }

  async function loadCredentials() {
    // verrifica as informações do localStorage
    const loadedLocal = loadData(localStorage);

    // caso exista alguma ele retorna
    if (loadedLocal) return;

    // verrifica as informações do sessionStorage
    const loadedSession = loadData(sessionStorage);

    // caso exista alguma ele retorna
    if (loadedSession) return;
  }

  useEffect(() => {
    loadCredentials();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signed,
        signIn,
        signOut,
        signUp,
        sendEmail,
        sendCode,
        sendPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
