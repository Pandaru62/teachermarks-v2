import axios, { AxiosInstance } from "axios";
import { useAuthStore } from "./useAuthStore";

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
      console.log("🚀 ~ useApi ~ originalRequest:", originalRequest)

      // If 401
      if (error.response.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          // Call to refresh endpoint

          // ERASE VITE_API_BASE_URL to check if it works
          const refreshResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh-token`, {
            withCredentials: true,
          });
  
          console.log("🚀 ~ useApi ~ refreshResponse:", refreshResponse)

          const { newAccessToken } = refreshResponse.data;

          // Store new access token
          useAuthStore.setState({
            accessToken: newAccessToken
          });
          console.log("🚀 ~ useApi ~ newAccessToken:", newAccessToken)

          // Retry original request
          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          // If error, redirect to login page
          useAuthStore.getState().logout();
          globalThis.location.href = "/signin";
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );

  return api;
}
