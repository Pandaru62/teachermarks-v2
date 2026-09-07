import { useApi } from "../hooks/useApi";

const api = useApi()

export default async function getDashboardData() {
    try {
        const { data } = await api.get('dashboard');
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}
