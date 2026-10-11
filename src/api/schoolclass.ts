import apiClient from "./apiClient";
import { CreateSchoolClassInterface, EditSchoolClassInterface } from "../interfaces/schoolclass.interface";

export default async function getSchoolClasses() {
    const { data } = await apiClient.get('classes');
	return data
}

export async function getSchoolClassById(id:number) {
    const { data } = await apiClient.get('classes/' + id);
	return data
}

export async function createSchoolClass(schoolClass : CreateSchoolClassInterface) {
    const { data } = await apiClient.post('classes', schoolClass);
	return data
}

export async function editSchoolClass(schoolClass : EditSchoolClassInterface, id : number) {
    const { data } = await apiClient.put('classes/' + id, schoolClass);
    return data
}

export async function archiveSchoolClass(id : number) {
    const { data } = await apiClient.patch('classes/' + id + '/archive');
    return data
}