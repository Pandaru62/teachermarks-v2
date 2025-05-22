import { useQuery } from "@tanstack/react-query";
import { getSchoolClassById } from "../../api/schoolclass";
import { SchoolClassWithPupilsInterface } from "../../interfaces/schoolclass.interface";

export default function useSchoolClassQuery(id: number) {

    const {
        data: schoolClass,
        isLoading: schoolClassLoading,
        isError: schoolClassError,
      } = useQuery<SchoolClassWithPupilsInterface>({
        queryKey: ["schoolClass", id],
        queryFn: () => getSchoolClassById(id),
      });


    return( 
        {schoolClass,
        schoolClassLoading,
        schoolClassError})
  }