import { useQuery } from "@tanstack/react-query";
import { getSchoolClassesWithPupilsAndAveragesById } from "../../api/schoolclass";
import { SchoolClassWithPupilsAndAveragesInterface } from "../../interfaces/schoolclass.interface";

export default function useSchoolClassWithAvgQuery(id: number) {

    const {
        data: schoolClassWithAverages,
        isLoading: schoolClassLoading,
        isError: schoolClassError,
      } = useQuery<SchoolClassWithPupilsAndAveragesInterface>({
        queryKey: ["schoolClass", id],
        queryFn: () => getSchoolClassesWithPupilsAndAveragesById(id),
      });


    return( 
        {schoolClassWithAverages,
        schoolClassLoading,
        schoolClassError})
  }