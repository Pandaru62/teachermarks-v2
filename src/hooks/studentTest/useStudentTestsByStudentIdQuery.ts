import { useQuery } from "@tanstack/react-query";
import { StudentTestByStudentInterface } from "../../interfaces/student-test.interface";
import { getAllStudentTestsByStudentId } from "../../api/studenttest";
import { getAverageBySkillByTrimester, getAverageMark } from "../../utils/calculations/average.function";

export default function useStudentTestsByStudentIdQuery(studentId : number) {

    const {
      data: studentTests,
      isLoading: studentTestsLoading,
      isError: studentTestsError,
    } = useQuery<StudentTestByStudentInterface[]>({
      queryKey: ["studentTestsByStudentId", studentId],
      queryFn: () => getAllStudentTestsByStudentId(studentId),
    });

  const average = getAverageMark(studentTests ?? []);

  
  const uniqueSkills = Array.from(
    new Map(
      studentTests?.flatMap(test => test.studenttesthasskill)
      .map(skillEntry => [skillEntry.skill.id, { id: skillEntry.skill.id, name: skillEntry.skill.name, abbr: skillEntry.skill.abbreviation }])
    ).values()
  );

  const averageSkills = getAverageBySkillByTrimester(studentTests ?? [], uniqueSkills);

  return( 
      {
        studentTests,
        studentTestsLoading,
        studentTestsError,
        average,
        uniqueSkills,
        averageSkills
    })
  }