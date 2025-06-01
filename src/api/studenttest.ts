import { useApi } from "../hooks/useApi";
import StudentTestInterface from "../interfaces/student-test.interface";

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

