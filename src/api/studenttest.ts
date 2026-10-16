import apiClient from "./apiClient";
import StudentTestInterface, { EditStudentTestInterface, StudentTestByStudentInterface } from "../interfaces/student-test.interface";

export default async function getAllStudentTestsByTestId(testId : number) : Promise<StudentTestInterface[]> {
    const { data } = await apiClient.get(`/student-test/test/${testId}`);
    const parsedData = data.map((t : StudentTestInterface) => ({
        ...t,
        mark: Number(t.mark),
        }));
    return parsedData
}

export async function getAllStudentTestsByStudentId(studentId : number) : Promise<StudentTestByStudentInterface[]> {
    const { data } = await apiClient.get(`/student-test/student/${studentId}`);
    const parsedData = data.map((t : StudentTestInterface) => ({
        ...t,
        mark: Number(t.mark),
        }));
    return parsedData
}

export async function editStudentTest(testId: number, studentId: number, studentTest : EditStudentTestInterface) {
    const { data } = await apiClient.put(`student-test/${studentId}/student/${testId}/test`, studentTest);
    const parsedData = { ...data, mark: Number(data.mark) }
    return parsedData
}

export async function batchEditStudentTests(testId: number, studentTests : EditStudentTestInterface[]) {
    const { data } = await apiClient.put(`student-test/${testId}/batch`, {studentTests: studentTests});
    return data
}

export async function generateCsv(testId : number) : Promise<Blob> {
    const { data } = await apiClient.get(`/student-test/csv/test/${testId}/export`, { responseType: 'blob' });
    return data
}

export async function generatePdf(testId : number) : Promise<Blob> {
    const { data } = await apiClient.get(`/student-test/pdf/test/${testId}/export`, { responseType: 'blob' });
    return data
}

export async function generateGridPdf(testId : number) : Promise<Blob> {
    const { data } = await apiClient.get(`/student-test/grid-pdf/test/${testId}/export`, { responseType: 'blob' });
    return data
}