import { useQuery } from "@tanstack/react-query";
import { getStudentsByClass } from "../../api/student";

export default function useStudentsByClassQuery(classId: number | null, options = {}) {
  const {
    data: students,
    isLoading: studentsLoading,
    isError: studentsError,
  } = useQuery({
    queryKey: ["classStudents", classId],
    queryFn: () => getStudentsByClass(classId!),
    enabled: classId !== null && classId !== undefined && classId > 0,
    ...options,
  });

  return { students, studentsLoading, studentsError };
}
