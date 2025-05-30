import { useQuery } from "@tanstack/react-query";
import getSchoolClasses from "../../api/schoolclass";
import SchoolClassInterface from "../../interfaces/schoolclass.interface";

export default function useSchoolClassesQueries() {

    const {
        data: schoolClasses,
        isLoading: schoolClassesLoading,
        isError: schoolClassesError,
      } = useQuery<SchoolClassInterface[]>({
        queryKey: ["schoolClasses"],
        queryFn: () => getSchoolClasses(),
      });


    return( 
        {schoolClasses,
        schoolClassesLoading,
        schoolClassesError})
  }