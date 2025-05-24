import { useQuery } from "@tanstack/react-query";
import getSkills from "../../api/skill";

export default function useSkillsQuery() {

    const {
        data: skills,
        isLoading: skillsLoading,
        isError: skillsError,
      } = useQuery({
        queryKey: ["skills"],
        queryFn: () => getSkills(),
      });


    return( 
        {skills,
        skillsLoading,
        skillsError})
  }