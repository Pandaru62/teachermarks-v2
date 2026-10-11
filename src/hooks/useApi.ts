import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "./useAuthStore";

let refreshPromise: Promise<string> | null = null;

function refreshAccessToken(): Promise<string> {
  refreshPromise ??= axios
    .get<{ newAccessToken: string }>(
      `${import.meta.env.VITE_API_BASE_URL}/auth/refresh-token`,
      { withCredentials: true },
    )
    .then(({ data }) => {
      useAuthStore.setState({
        accessToken: data.newAccessToken,
      });

      return data.newAccessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export function useApi() {

  const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    withCredentials: true,
    headers : {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }
  });

  api.interceptors.request.use((config) => {
    const currentToken = useAuthStore.getState().accessToken;
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry &&
        !originalRequest.url?.includes("/auth/refresh-token")
      ) {
        originalRequest._retry = true;
        try {
          const newAccessToken = await refreshAccessToken();

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          if ( axios.isAxiosError(refreshError) && [401, 403].includes(refreshError.response?.status ?? 0)) {
            useAuthStore.getState().logout();
            globalThis.location.href = "/signin";
          }

          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
