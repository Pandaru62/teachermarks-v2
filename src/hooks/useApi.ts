import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "./useAuthStore";

export function useApi() {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const api: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers,
  });

  api.interceptors.request.use((config) => {
    // on intercepte la requête et on ajoute le token si nécessaire
    const currentToken = useAuthStore.getState().accessToken;
    if (currentToken) {
      // on ajoute le token à la requête
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    // on retourne la requête
    return config;
  });

  api.interceptors.response.use(
    // on intercepte la réponse et on la retourne
    (response) => response,
    // on intercepte les erreurs
    async (error) => {
      // on récupère la requête originale
      const originalRequest = error.config;

      // Si l'erreur est 401
      if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // on récupère le token de rafraîchissement
          const currentRefreshToken = useAuthStore.getState().refreshToken;
          if (!currentRefreshToken) throw new Error("No refresh token available");

          // Appel pour rafraîchir le token (on crée une instance axios pour l'appel pour éviter les erreurs de récursion)
          const refreshApi = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            headers: {
              ...headers,
              Authorization: `Bearer ${currentRefreshToken}`,
            },
          });

          // on appelle la route pour rafraîchir le token
          const response = await refreshApi.get("/auth/refresh-token");
          const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data;

          // Mise à jour du token dans le localStorage
          useAuthStore.setState({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          });

          // Réessayer la requête originale avec le nouveau token
          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          // En cas d'échec du refresh, on peut rediriger vers la page de login
          useAuthStore.getState().logout();
          window.location.href = "/login";
          // On rejette la requête pour que le composant qui appelle l'API puisse gérer l'erreur
          return Promise.reject(refreshError);
        }
      }
      // Si l'erreur n'est pas liée au token, on la rejette
      return Promise.reject(error);
    }
  );

  return api;
}
