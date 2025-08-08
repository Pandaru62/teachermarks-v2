import { TrimesterEnum } from "./test.interface";

export default interface ReportInterface {
    id: number,
    description: string,
    trimester: TrimesterEnum,
    studentId: number
}

export type EditReportInterface = Pick<ReportInterface, "description" | "trimester">;