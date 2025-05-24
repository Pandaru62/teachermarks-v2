import { useQuery } from "@tanstack/react-query";
import getSchoolClasses from "../../api/schoolclass";

export default function useSchoolClassesQueries() {

    const {
        data: schoolClasses,
        isLoading: schoolClassesLoading,
        isError: schoolClassesError,
      } = useQuery({
        queryKey: ["schoolClasses"],
        queryFn: () => getSchoolClasses(),
      });


    return( 
        {schoolClasses,
        schoolClassesLoading,
        schoolClassesError})
  }