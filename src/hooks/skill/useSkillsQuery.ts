import { useQuery } from "@tanstack/react-query";
import getSkills from "../../api/skill";
import SkillInterface from "../../interfaces/skill.interface";

export default function useSkillsQuery() {

    const {
        data: skills,
        isLoading: skillsLoading,
        isError: skillsError,
      } = useQuery<SkillInterface[]>({
        queryKey: ["skills"],
        queryFn: () => getSkills(),
      });


    return( 
        {skills,
        skillsLoading,
        skillsError})
  }