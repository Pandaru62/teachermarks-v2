import apiClient from "./apiClient";
import { UserWithoutPassword } from "../hooks/useAuthStore";
import ProfileInterface from "../interfaces/profile.interface";
import { TrimesterEnum } from "../interfaces/test.interface";

export async function editProfile(profile : Pick<ProfileInterface, "firstname" | "lastname" | "school">, id : number) : Promise<UserWithoutPassword> {
    const { data } = await apiClient.put('user/' + id, profile);
    return data;
}

export async function editPreferences(id : number, trimester : TrimesterEnum) : Promise<TrimesterEnum> {
    const { data } = await apiClient.put('user/preferences/' + id, {current_trimester: trimester});
    return data;
}