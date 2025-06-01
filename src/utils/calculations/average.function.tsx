import StudentTestInterface, { SkillLevelEnum } from "../../interfaces/student-test.interface";

export default function calculateAverage(numbers : number[]): number {
    return numbers.reduce((acc, number) => acc + number, 0)/numbers.length
}

export function getAverageMark(studentTests : StudentTestInterface[]): number {
    // only count tests for which students were present and marked
    const marks = studentTests.filter((sT) => sT.isAbsent === false && sT.isUnmarked === false).map((studentTest) => studentTest.mark);
    return calculateAverage(marks);
}

export function countAbsent(studentTests : StudentTestInterface[]): number {
    return studentTests.filter((sT) => sT.isAbsent === true).length
}

export function countUnmarked(studentTests : StudentTestInterface[]): number {
    return studentTests.filter((sT) => sT.isUnmarked === true).length
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

export function getAverageSkillById(studentTests : StudentTestInterface[], skillId: number) : {average: number, level : SkillLevelEnum} {
    
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