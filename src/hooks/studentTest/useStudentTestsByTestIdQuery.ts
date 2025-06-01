import { useQuery } from "@tanstack/react-query";
import StudentTestInterface from "../../interfaces/student-test.interface";
import getAllStudentTestsByTestId from "../../api/studenttest";
import { countAbsent, countMarked, countUnmarked, getAverageMark } from "../../utils/calculations/average.function";

export default function useStudentTestsByTestIdQuery(testId : number) {

    const {
        data: studentTests,
        isLoading: studentTestsLoading,
        isError: studentTestsError,
      } = useQuery<StudentTestInterface[]>({
        queryKey: ["studentTests", testId],
        queryFn: () => getAllStudentTestsByTestId(testId),
      });

      const numAbsent = countAbsent(studentTests ?? [])
      const numUnmarked = countUnmarked(studentTests ?? [])
      const numMarked = countMarked(studentTests ?? [])
      const average = getAverageMark(studentTests ?? [])

    return( 
        {
          studentTests,
          studentTestsLoading,
          studentTestsError,
          numAbsent,
          numUnmarked,
          numMarked,
          average
      })
  }