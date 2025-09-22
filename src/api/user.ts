import { useApi } from "../hooks/useApi";
import { UserWithoutPassword } from "../hooks/useAuthStore";

const api = useApi()

export async function disableFirstVisit() : Promise<UserWithoutPassword> {
    try {
        const { data } = await api.patch('user/first-visit');
        return data
    } catch (error: any) {
        throw new Error(error);
    }

}