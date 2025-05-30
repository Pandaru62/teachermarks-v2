import { useApi } from "../hooks/useApi";
import StudentInterface, { CreateStudentInterface, EditStudentInterface } from "../interfaces/student.interface";

const api = useApi()

export default async function getAllStudents() : Promise<StudentInterface[]> {
    try {
        const { data } = await api.get('students');
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getStudentsByClass(classId: number) : Promise<StudentInterface[]> {
    try {
        const { data } = await api.get('students/' + classId + '/class');
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getStudentById(id:number) : Promise<StudentInterface> {
    try {
        const { data } = await api.get('students/' + id);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createManyStudents(students : CreateStudentInterface[]) : Promise<StudentInterface[]> {
    try {
        const { data } = await api.post('students', students);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function editStudent(student : EditStudentInterface, id : number) : Promise<StudentInterface> {
    try {
        const { data } = await api.put('students/' + id, student);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteStudent(id : number) {
    try {
        const { data } = await api.delete('students/' + id);
        return data
    } catch (error: any) {
        throw new Error(error);
    }
}

