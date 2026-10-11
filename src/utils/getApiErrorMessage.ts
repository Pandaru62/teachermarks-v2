import axios from "axios";
import type { ApiErrorResponse } from "../types/api-error";

export const getApiErrorMessage = async (error: unknown): Promise<string> => {
  if (!axios.isAxiosError(error)) {
    return "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
  }

  const data = error.response?.data;

  if (data instanceof Blob) {
    try {
      const text = await data.text();
      const parsed = JSON.parse(text) as ApiErrorResponse;

      if (parsed.message) {
        return parsed.message;
      }
    } catch {
      // Le Blob n'est pas du JSON exploitable
    }
  }

  if (data?.message) {
    return data.message;
  }

  if (!error.response) {
    return "Impossible de contacter le serveur. Vérifiez votre connexion.";
  }

  return "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
};