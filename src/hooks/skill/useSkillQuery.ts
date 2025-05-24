import { useQuery } from "@tanstack/react-query";
import SkillInterface from "../../interfaces/skill.interface";
import { getSkillById } from "../../api/skill";

export default function useSkillQuery(id: number) {

    const {
        data: skill,
        isLoading: skillLoading,
        isError: skillError,
      } = useQuery<SkillInterface>({
        queryKey: ["skill", id],
        queryFn: () => getSkillById(id),
      });


    return( 
        {skill,
        skillLoading,
        skillError})
  }