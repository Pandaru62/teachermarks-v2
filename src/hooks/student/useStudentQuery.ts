import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "../../api/student";

export default function useStudentQuery(id : number) {

    const {
        data: student,
        isLoading: studentLoading,
        isError: studentError,
      } = useQuery({
        queryKey: ["student", id],
        queryFn: () => getStudentById(id),
      });


    return( 
        {student,
        studentLoading,
        studentError})
  }