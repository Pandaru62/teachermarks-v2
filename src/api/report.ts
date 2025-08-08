import { useApi } from "../hooks/useApi";
import ReportInterface, { EditReportInterface } from "../interfaces/report.interface";

const api = useApi()

export async function getReportByStudentId(id:number) : Promise<ReportInterface[]> {
    try {
        const { data } = await api.get('reports/' + id);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function editReport(report : EditReportInterface, id : number) : Promise<ReportInterface> {
    try {
        const { data } = await api.put('reports/' + id, report);
		return data
    } catch (error: any) {
        throw new Error(error);
    }
}

