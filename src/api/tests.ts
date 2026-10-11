import apiClient from "./apiClient";
import TestInterface, { CreateTestInterface, EditTestInterface } from "../interfaces/test.interface";

export default async function getAllTests() {
    const { data } = await apiClient.get('tests');
	return data
}

export async function getTestTags() {
    const { data } = await apiClient.get('testtags');
	return data
}

export async function getTestById(id:number) {
    const { data } = await apiClient.get('tests/' + id);
	return data
}

export async function getTestsByClassId(id:number) {
    const { data } = await apiClient.get('tests/class/' + id);
	return data
}

export async function createTest(test : CreateTestInterface) {
    const { data } = await apiClient.post('tests', test);
    return data
}

export async function editTest(test : EditTestInterface, id : number) {
    const { data } = await apiClient.put('tests/' + id, test);
    return data
}

export async function deleteTest(id : number): Promise<TestInterface> {
    const { data } = await apiClient.delete('tests/' + id);
    return data
}