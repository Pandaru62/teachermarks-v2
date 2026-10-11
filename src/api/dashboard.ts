import apiClient from "./apiClient";

export default async function getDashboardData() {
    const { data } = await apiClient.get('dashboard');
    return data;
}