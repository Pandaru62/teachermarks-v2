import { TrimesterEnum } from "./test.interface";

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
            name: string,
            abbreviation: string
        },
        level: SkillLevelEnum
    }[]
}

export interface StudentTestByStudentInterface {
  id: number;
  mark: number;
  isAbsent: boolean;
  isUnmarked: boolean;
  test: {
    coefficient: number;
    date: string;
    description: string;
    name: string;
    scale: number;
    id: number;
    trimester: TrimesterEnum;
  };
  studenttesthasskill: {
    skill: {
      id: number;
      name: string;
      abbreviation: string;
    };
    level: SkillLevelEnum;
  }[];
}

export interface EditStudentTestInterface {
    mark: number,
    isAbsent: boolean,
    isUnmarked: boolean,
    skills: {
        skillId: number,
        level: SkillLevelEnum
    }[]
};