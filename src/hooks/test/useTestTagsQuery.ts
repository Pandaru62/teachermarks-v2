import { useQuery } from "@tanstack/react-query";
import { getTestTags } from "../../api/tests";
import { testtag } from "../../interfaces/test.interface";

export default function useTestTags() {

    const {
        data: testTags,
        isLoading: testTagsLoading,
        isError: testTagsError,
      } = useQuery<testtag[]>({
        queryKey: ["tests"],
        queryFn: () => getTestTags(),
      });


    return( 
        {testTags,
        testTagsLoading,
        testTagsError})
  }