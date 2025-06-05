import { useApi } from "../hooks/useApi";
import StudentTestInterface, { EditStudentTestInterface, StudentTestByStudentInterface } from "../interfaces/student-test.interface";

const api = useApi()

export default async function getAllStudentTestsByTestId(testId : number) : Promise<StudentTestInterface[]> {
    try {
        const { data } = await api.get(`/student-test/test/${testId}`);
        const parsedData = data.map((t : StudentTestInterface) => ({
            ...t,
            mark: Number(t.mark),
            }));
        return parsedData
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getAllStudentTestsByStudentId(studentId : number) : Promise<StudentTestByStudentInterface[]> {
    try {
        const { data } = await api.get(`/student-test/student/${studentId}`);
        const parsedData = data.map((t : StudentTestInterface) => ({
            ...t,
            mark: Number(t.mark),
            }));
        return parsedData
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function editStudentTest(testId: number, studentId: number, studentTest : EditStudentTestInterface) {
    try {
        const { data } = await api.put(`student-test/${studentId}/student/${testId}/test`, studentTest);
		const parsedData = { ...data, mark: Number(data.mark)}
        return parsedData
    } catch (error: any) {
        throw new Error(error);
    }
}

