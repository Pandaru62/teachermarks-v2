import apiClient from "./apiClient";
import ReportInterface, { EditReportInterface } from "../interfaces/report.interface";

export async function getReportByStudentId(id:number) : Promise<ReportInterface[]> {
    const { data } = await apiClient.get('reports/' + id);
    return data
}

export async function editReport(report : EditReportInterface, id : number) : Promise<ReportInterface> {
    const { data } = await apiClient.put('reports/' + id, report);
    return data
}