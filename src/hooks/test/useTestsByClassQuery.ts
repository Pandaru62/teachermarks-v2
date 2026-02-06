import { useQuery } from "@tanstack/react-query";
import { getTestsByClassId } from "../../api/tests";
import TestInterface from "../../interfaces/test.interface";

export default function useTestsByClassQuery(classId: number | null, options = {}) {

    const {
        data: allTestsByClass,
        isLoading: allTestsByClassLoading,
        isError: allTestsByClassError,
      } = useQuery<TestInterface[]>({
        queryKey: ["testsByClass", classId],
        queryFn: () => getTestsByClassId(classId!),
        enabled: classId !== null && classId !== undefined && classId > 0,
        ...options
      });


    return( 
        {allTestsByClass,
        allTestsByClassLoading,
        allTestsByClassError})
  }