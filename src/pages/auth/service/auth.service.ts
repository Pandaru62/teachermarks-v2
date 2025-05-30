import axios from "axios";
import { useApi } from "../../../hooks/useApi";
import { LoginFormValues } from "./signin.service";

const api = useApi();

  export async function signin(data: LoginFormValues) {
    try {
      const response = await api.post("auth/signin", data);
      return response;
    } catch (error) {
      throw new Error(`Une erreur est survenue: ${error}`);
    }
  }

    export async function signup(data: LoginFormValues) {
    try {
      const response = await axios.post(import.meta.env.VITE_API_BASE_URL + "auth/signup", data);
      return response.data;
    } catch (error) {
      throw new Error(`Une erreur est survenue: ${error}`);
    }
  }