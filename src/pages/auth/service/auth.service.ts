
import apiClient from "../../../api/apiClient";
import type { LoginFormValues } from "./signin.service";
import type { SignUpFormValues } from "./signup.service";

export async function signin(data: LoginFormValues) {
  const { data: responseData } = await apiClient.post(
    "auth/signin",
    data,
  );

  return responseData;
}

export async function signup(data: SignUpFormValues) {
  const { data: responseData } = await apiClient.post(
    "auth/signup",
    data,
  );

  return responseData;
}

export async function logOutClearCookies() {
  // À implémenter lorsque la route de déconnexion du backend sera définie.
}
