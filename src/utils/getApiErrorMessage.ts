import axios from "axios";
import type { ApiErrorResponse } from "../types/api-error";

export const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (!error.response) {
      return "Impossible de contacter le serveur. Vérifiez votre connexion.";
    }
  }

  return "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
};
