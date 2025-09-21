import { useQuery } from "@tanstack/react-query";
import { StudentTestByStudentInterface } from "../../interfaces/student-test.interface";
import { getAllStudentTestsByStudentId } from "../../api/studenttest";
import { getAverageBySkillByTrimester, getAverageSkillById, getStudentAverage } from "../../utils/calculations/average.function";

export default function useStudentTestsByStudentIdQuery(studentId : number) {

    const {
      data: studentTests,
      isLoading: studentTestsLoading,
      isError: studentTestsError,
    } = useQuery<StudentTestByStudentInterface[]>({
      queryKey: ["studentTestsByStudentId", studentId],
      queryFn: () => getAllStudentTestsByStudentId(studentId),
    });

  const average = getStudentAverage(studentTests ?? []);

  
  const uniqueSkills = Array.from(
    new Map(
      studentTests?.flatMap(test => test.studenttesthasskill)
      .map(skillEntry => [skillEntry.skill.id, 
        { 
          id: skillEntry.skill.id, 
          name: skillEntry.skill.name, 
          abbr: skillEntry.skill.abbreviation,
          avg: getAverageSkillById(studentTests, skillEntry.skill.id).average }])
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