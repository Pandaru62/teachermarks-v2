import { useApi } from "../hooks/useApi";
import { CreateSchoolClassInterface, EditSchoolClassInterface } from "../interfaces/schoolclass.interface";

const api = useApi()

export default async function getSchoolClasses() {
    try {
        const { data } = await api.get('classes');
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getSchoolClassById(id:number) {
    try {
        const { data } = await api.get('classes/' + id);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createSchoolClass(schoolClass : CreateSchoolClassInterface) {
    try {
        const { data } = await api.post('classes', schoolClass);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function editSchoolClass(schoolClass : EditSchoolClassInterface, id : number) {
    try {
        const { data } = await api.put('classes/' + id, schoolClass);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function archiveSchoolClass(id : number) {
    try {
        const { data } = await api.patch('classes/' + id + '/archive');
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}