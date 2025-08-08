import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "../../api/student";
import { getReportByStudentId } from "../../api/report";

export default function useStudentQuery(id : number) {

    const {
        data: student,
        isLoading: studentLoading,
        isError: studentError,
      } = useQuery({
        queryKey: ["student", id],
        queryFn: () => getStudentById(id),
      });

      const {
        data: studentReports,
        isLoading: studentReportsLoading,
        isError: studentReportsError,
      } = useQuery({
        queryKey: ["studentReport", id],
        queryFn: () => getReportByStudentId(id),
      });


    return( 
      {student,
      studentLoading,
      studentError,
      studentReports,
      studentReportsLoading,
      studentReportsError})
  }