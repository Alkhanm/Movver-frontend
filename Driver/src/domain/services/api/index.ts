import axios, { AxiosError, AxiosResponse } from "axios";

function onSuccessReponse(value: AxiosResponse): Promise<AxiosResponse> {
  return Promise.resolve(value);
}

function onErrorReponse(value: AxiosError): Promise<AxiosError> {
  return Promise.reject(value);
}

const http = axios.create({
  baseURL: "http://192.168.100.4:8080/"
  //baseURL: "https://movver.herokuapp.com"
})

http.interceptors.response.use(onSuccessReponse, onErrorReponse);

export { http };
