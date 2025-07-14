import { useApi } from "../hooks/useApi";
import { UserWithoutPassword } from "../hooks/useAuthStore";
import ProfileInterface from "../interfaces/profile.interface";

const api = useApi()

export async function editProfile(profile : Pick<ProfileInterface, "firstname" | "lastname" | "school">, id : number) : Promise<UserWithoutPassword> {
    try {
        const { data } = await api.put('user/' + id, profile);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}
