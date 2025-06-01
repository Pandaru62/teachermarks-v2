export enum SkillLevelEnum {
  NN = "NN",
  ABS = "ABS",
  LVL0 = "LVL0",
  LVL1 = "LVL1",
  LVL2 = "LVL2",
  LVL3 = "LVL3",
  LVL4 = "LVL4"
}

export default interface StudentTestInterface {
    id: number,
    mark: number,
    isAbsent: boolean,
    isUnmarked: boolean,
    student: {
        id: number,
        lastName: string,
        firstName: string
    },
    studenttesthasskill: {
        skill: {
            id: number,
            name: number,
            abbreviation: string
        },
        level: SkillLevelEnum
    }[]
}

// export type CreateStudentInterface = Pick<StudentInterface, "lastName" | "firstName">;

// export type EditStudentInterface = Pick<StudentInterface, "lastName" | "firstName">;