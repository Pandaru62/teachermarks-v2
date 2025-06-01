import { useQuery } from "@tanstack/react-query";
import { getTestById } from "../../api/tests";
import TestInterface from "../../interfaces/test.interface";

export default function useTestQuery(id : number) {

    const {
        data: test,
        isLoading: testLoading,
        isError: testError,
      } = useQuery<TestInterface>({
        queryKey: ["test", id],
        queryFn: () => getTestById(id),
      });


    return( 
        {test,
        testLoading,
        testError})
  }