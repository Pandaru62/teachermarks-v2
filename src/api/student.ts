import apiClient from "./apiClient";
import StudentInterface, { CreateStudentsInterface, EditStudentInterface } from "../interfaces/student.interface";

export default async function getAllStudents() : Promise<StudentInterface[]> {
    const { data } = await apiClient.get('students');
    return data
}

export async function getStudentsByClass(classId: number) : Promise<StudentInterface[]> {
    const { data } = await apiClient.get('students/' + classId + '/class');
    return data;
}

export async function getStudentById(id:number) : Promise<StudentInterface> {
    const { data } = await apiClient.get('students/' + id);
    return data
}

export async function createManyStudents(students : CreateStudentsInterface) : Promise<StudentInterface[]> {
    const { data } = await apiClient.post('students', students);
    return data;
}

export async function editStudent(student : EditStudentInterface, id : number) : Promise<StudentInterface> {
    const { data } = await apiClient.put('students/' + id, student);
    return data;
}

export async function deleteStudent(id : number) {
    const { data } = await apiClient.delete('students/' + id);
    return data
}

