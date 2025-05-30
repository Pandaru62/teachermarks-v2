import { useQuery } from "@tanstack/react-query";
import { getStudentsByClass } from "../../api/student";

export default function useStudentsByClassQuery(classId : number) {

    const {
        data: students,
        isLoading: studentsLoading,
        isError: studentsError,
      } = useQuery({
        queryKey: ["classStudents", classId],
        queryFn: () => getStudentsByClass(classId),
      });


    return( 
        {students,
        studentsLoading,
        studentsError})
  }