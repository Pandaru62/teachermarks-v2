import apiClient from "./apiClient";
import { UserWithoutPassword } from "../hooks/useAuthStore";

export async function disableFirstVisit() : Promise<UserWithoutPassword> {
    const { data } = await apiClient.patch('user/first-visit');
    return data
}