import { useQuery } from "@tanstack/react-query";
import getSchoolClasses from "../../api/schoolclass";
import { SchoolClassWithCountInterface } from "../../interfaces/schoolclass.interface";

export default function useSchoolClassesQueries() {

  const {
    data: schoolClasses,
    isLoading: schoolClassesLoading,
    isError: schoolClassesError,
  } = useQuery<SchoolClassWithCountInterface[]>({
    queryKey: ["schoolClasses"],
    queryFn: () => getSchoolClasses(),
  });

  return( 
    {schoolClasses,
    schoolClassesLoading,
    schoolClassesError})
}