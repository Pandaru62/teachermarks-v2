import { useQuery } from "@tanstack/react-query";
import { getSchoolClassWithPupilsAndAveragesById } from "../../api/schoolclass";
import { SchoolClassWithPupilsAndAveragesInterface } from "../../interfaces/schoolclass.interface";

export default function useSchoolClassWithAvgQuery(id: number) {

    const {
        data: schoolClassWithAverages,
        isLoading: schoolClassLoading,
        isError: schoolClassError,
      } = useQuery<SchoolClassWithPupilsAndAveragesInterface>({
        queryKey: ["schoolClass", id],
        queryFn: () => getSchoolClassWithPupilsAndAveragesById(id),
      });


    return( 
        {schoolClassWithAverages,
        schoolClassLoading,
        schoolClassError})
  }