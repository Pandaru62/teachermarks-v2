import { useQuery } from "@tanstack/react-query";
import { getTestById } from "../../api/tests";

export default function useTestQuery(id : number) {

    const {
        data: test,
        isLoading: testLoading,
        isError: testError,
      } = useQuery({
        queryKey: ["test", id],
        queryFn: () => getTestById(id),
      });


    return( 
        {test,
        testLoading,
        testError})
  }