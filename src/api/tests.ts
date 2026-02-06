import { useApi } from "../hooks/useApi";
import TestInterface, { CreateTestInterface, EditTestInterface } from "../interfaces/test.interface";

const api = useApi()

export default async function getAllTests() {
    try {
        const { data } = await api.get('tests');
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getTestTags() {
    try {
        const { data } = await api.get('testtags');
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getTestById(id:number) {
    try {
        const { data } = await api.get('tests/' + id);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getTestsByClassId(id:number) {
    try {
        const { data } = await api.get('tests/class/' + id);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function createTest(test : CreateTestInterface) {
    try {
        const { data } = await api.post('tests', test);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function editTest(test : EditTestInterface, id : number) {
    try {
        const { data } = await api.put('tests/' + id, test);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteTest(id : number): Promise<TestInterface> {
    try {
        const { data } = await api.delete('tests/' + id);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}