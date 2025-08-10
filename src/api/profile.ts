import { useApi } from "../hooks/useApi";
import { UserWithoutPassword } from "../hooks/useAuthStore";
import ProfileInterface from "../interfaces/profile.interface";
import { TrimesterEnum } from "../interfaces/test.interface";

const api = useApi()

export async function editProfile(profile : Pick<ProfileInterface, "firstname" | "lastname" | "school">, id : number) : Promise<UserWithoutPassword> {
    try {
        const { data } = await api.put('user/' + id, profile);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function editPreferences(id : number, trimester : TrimesterEnum) : Promise<TrimesterEnum> {
    try {
        const { data } = await api.put('user/preferences/' + id, {current_trimester: trimester});
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}