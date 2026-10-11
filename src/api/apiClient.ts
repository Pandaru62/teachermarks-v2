import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../hooks/useAuthStore";

const baseURL = (
  import.meta.env.VITE_API_BASE_URL || "/api"
).replace(/\/$/, "");

const apiClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Partage une seule requête de renouvellement entre les appels simultanés.
let refreshPromise: Promise<string> | null = null;

function refreshAccessToken(): Promise<string> {
  refreshPromise ??= axios
    .get<{ newAccessToken: string }>(
      `${baseURL}/auth/refresh-token`,
      { withCredentials: true },
    )
    .then(({ data }) => {
      useAuthStore.setState({ accessToken: data.newAccessToken });
      return data.newAccessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

// Ajoute le token courant à chaque requête.
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// Renouvelle le token si nécessaire, puis rejoue la requête initiale.
apiClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as
      | RetryableRequestConfig
      | undefined;

    const isRefreshRequest = originalRequest?.url?.includes(
      "/auth/refresh-token",
    );

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      isRefreshRequest
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      if (
        axios.isAxiosError(refreshError) &&
        [401, 403].includes(refreshError.response?.status ?? 0)
      ) {
        useAuthStore.getState().logout();
        globalThis.location.href = "/signin";
      }

      return Promise.reject(refreshError);
    }
  },
);

export default apiClient;
