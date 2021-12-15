import { iClient } from "../../model/interfaces/iClient";
import { StorageKeys } from "../config";
import { StorageFunctions } from "../function/storage-function";
import { http } from "./index";

interface Crendentials {
  readonly token: string;
  readonly user: iClient;
}

const AUTH_URL = "/auth";
const AUTH_VALIDATION_URL = `${AUTH_URL}/token-validation`

// Salva no armazenamento (Storage) do aparelho o objeto "client" e "token" do cliente
async function setCredentials(crendentials: Crendentials): Promise<void> {
  const { user, token }: Crendentials = crendentials;
  http.defaults.headers["Authorization"] = `Bearer ${token}`
  await StorageFunctions.set(StorageKeys.client, user)
  await StorageFunctions.set(StorageKeys.token, token);
}

// Retorna do armazenamento (Storage) o objeto "client" e seu "token"
async function getCredentials(): Promise<Crendentials> {
  const client = await StorageFunctions.get(StorageKeys.client) as iClient;
  const token = await StorageFunctions.get(StorageKeys.token) as string;
  return { user: client, token };
}

// Verifica se o usuario atual possui um token de login valido
async function isLogged(): Promise<boolean> {
  const token = await StorageFunctions.get(StorageKeys.token)
  const response = await http.post(AUTH_VALIDATION_URL, token);
  const isValid = response.data as boolean;
  if (!isValid) throw new Error("Sessão expirada. É preciso realizar o login.");
  return isValid;
}

// Realiza o primeiro login do usuario (caso ele esteja usando o aplicativo pela primeira vez)
async function signIn(phoneNumber: string, password: string): Promise<iClient> {
  const response = await http.post(AUTH_URL, { phoneNumber, password });
  const credentials: Crendentials = response.data;
  await setCredentials(credentials);
  return credentials.user;
}

//Realiza o login automatico (caso o usuário já tenha se logado no aplicativo atráves do dispositivo atual)
async function automaticSignIn(): Promise<iClient> {
  const isValid = await isLogged();
  if (!isValid) return Promise.reject(isValid)
  const credentials = await getCredentials();
  await setCredentials(credentials);
  return credentials.user;
}

async function signOut(): Promise<void> {
  await StorageFunctions.remove(StorageKeys.token);
  await StorageFunctions.remove(StorageKeys.client);
}


export const AuthHttp = {
  signIn,
  signOut,
  automaticSignIn
}