import StudentTestInterface, { SkillLevelEnum, StudentTestByStudentInterface } from "../../interfaces/student-test.interface";
import { TrimesterEnum } from "../../interfaces/test.interface";

export default function calculateAverage(numbers : number[]): number {
    return (numbers.reduce((acc, number) => acc + number, 0)/numbers.length)
}

export function getTestAverageMark(studentTests : StudentTestInterface[]): number {
    // only count students who were present and marked
    const marks = studentTests.filter((sT) => sT.isAbsent === false && sT.isUnmarked === false).map((studentTest) => studentTest.mark);
    return calculateAverage(marks);
}

export function calculateStudentAverage(numbers : number[], totalScale : number): number {
    return ((numbers.reduce((acc, number) => acc + number, 0)/totalScale)*20)
}


export function getStudentAverage(studentTests: StudentTestByStudentInterface[]): number {
  // only count tests where student was present and marked
  const validTests = studentTests.filter(
    (st) => !st.isAbsent && !st.isUnmarked
  );

  const marks = validTests.map(
    (st) => st.mark * st.test.coefficient
  );

  const totalScale = validTests.reduce(
    (acc, st) => acc + st.test.coefficient * st.test.scale,
    0
  );

  return totalScale > 0 ? calculateStudentAverage(marks, totalScale) : 0;
}

export function countAbsent(studentTests : StudentTestInterface[]): number {
    return studentTests.filter((sT) => sT.isAbsent === true).length
}

export function countUnmarked(studentTests : StudentTestInterface[]): number {
    return studentTests.filter(
        (sT) => sT.isUnmarked === true
    ).length
}

export function countMarked(studentTests : StudentTestInterface[]): number {
    return studentTests.filter((sT) => sT.isAbsent === false && sT.isUnmarked === false).length
}

export function applyAverageSkillLevel(average : number) : SkillLevelEnum {
    if (average > 3.6) {
        return SkillLevelEnum.LVL4
    }
    if (average > 2.9) {
        return SkillLevelEnum.LVL3
    }
    if (average > 1.9) {
        return SkillLevelEnum.LVL2
    }
    if (average > 0.9) {
        return SkillLevelEnum.LVL1
    }
    return SkillLevelEnum.LVL0

}

export function getAverageSkillById(studentTests : StudentTestInterface[] | StudentTestByStudentInterface[], skillId: number) : {average: number, level : SkillLevelEnum} {
    
    // 1. get each result for given skill Id
    const skillList : SkillLevelEnum[] = []
    studentTests.forEach((studentTest) => studentTest.studenttesthasskill.filter((st) => st.skill.id === skillId).forEach(skills => skillList.push(skills.level)));
    
    // 2. only keep the LVL-* labeled skill levels and format into number
    const skills : number[] = []
    skillList.forEach(skill => skill !== SkillLevelEnum.ABS && skill !== SkillLevelEnum.NN && skills.push(Number(skill[3])));

    // 3. calculate average
    const average = calculateAverage(skills);

    // 4. get bubble skill level
    const level = applyAverageSkillLevel(average);
    
    return {
        average,
        level
    };
}

export interface AverageBySkillByTrimesterInterface {
    trimester: TrimesterEnum;
    skills: {
      id: number;
      name: string;
      result: number;
    }[];
  }


export function getAverageBySkillByTrimester(
  studentTests: StudentTestByStudentInterface[],
  uniqueSkills: { id: number; name: string; abbr: string }[]
) : AverageBySkillByTrimesterInterface[] {
  interface ResultInterface {
    trimester: TrimesterEnum;
    skills: {
      id: number;
      name: string;
      result: number;
    }[];
  }

  let results: ResultInterface[] = [];

  const trimesters = Object.values(TrimesterEnum) as TrimesterEnum[];

  for (const trimester of trimesters) {
    const skills: {
      id: number;
      name: string;
      result: number;
    }[] = [];

    const trimResults = studentTests.filter(
      (st) =>
        st.test.trimester === trimester &&
        !st.isAbsent &&
        !st.isUnmarked
    );

    for (const skill of uniqueSkills) {
      const numericLevels: number[] = [];

      for (const studentTest of trimResults) {
        for (const sths of studentTest.studenttesthasskill) {
          if (
            sths.skill.id === skill.id &&
            sths.level !== SkillLevelEnum.ABS &&
            sths.level !== SkillLevelEnum.NN
          ) {
            // Get the numeric level from enum key (e.g., LVL2 → 2)
            const levelString = sths.level.toString(); // "LVL2"
            const numeric = parseInt(levelString.replace("LVL", ""), 10);
            if (!isNaN(numeric)) {
              numericLevels.push(numeric);
            }
          }
        }
      }

      const average =
        numericLevels.length > 0
          ? numericLevels.reduce((a, b) => a + b, 0) / numericLevels.length
          : 0;

      skills.push({
        id: skill.id,
        name: skill.name,
        result: parseFloat(average.toFixed(2)), // optional: round to 2 decimals
      });
    }

    results.push({
      trimester,
      skills,
    });
  }

  return results;
}

