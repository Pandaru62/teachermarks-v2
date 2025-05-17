import { useApi } from "../hooks/useApi";

const api = useApi()

export default async function getSchoolClasses() {
    try {
        const { data } = await api.get('classes');
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}