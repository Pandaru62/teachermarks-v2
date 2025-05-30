import { useQuery } from "@tanstack/react-query";
import getAllTests from "../../api/tests";
import TestInterface from "../../interfaces/test.interface";

export default function useAllTestsQuery() {

    const {
        data: allTests,
        isLoading: allTestsLoading,
        isError: allTestsError,
      } = useQuery<TestInterface[]>({
        queryKey: ["tests"],
        queryFn: () => getAllTests(),
      });


    return( 
        {allTests,
        allTestsLoading,
        allTestsError})
  }