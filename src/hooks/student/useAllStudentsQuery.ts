import { useQuery } from "@tanstack/react-query";
import getAllStudents from "../../api/student";

export default function useAllStudentsQuery() {

    const {
        data: allStudents,
        isLoading: allStudentsLoading,
        isError: allStudentsError,
      } = useQuery({
        queryKey: ["students"],
        queryFn: () => getAllStudents(),
      });


    return( 
        {allStudents,
        allStudentsLoading,
        allStudentsError})
  }