export enum TrimesterEnum {
  TR1 = "TR1",
  TR2 = "TR2",
  TR3 = "TR3"
}

export default interface TestInterface {
    id: number,
    name: string,
    description?: string,
    date: Date | string,
    trimester: TrimesterEnum,
    scale: number,
    coefficient: number,
    schoolclass?: {
      name: string,
      count: number,
      color: string
    },
    schoolClassId: number,
    created_at: Date | string,
    updated_at: Date | string,
    skills: {
      id: number,
      name: string,
      abbreviation: string
    }[]
}

export type CreateTestInterface = Pick<TestInterface, "name" | "description" | "date" | "trimester" | "scale" | "coefficient" | "schoolClassId" | "skills">;

export type EditTestInterface = Pick<TestInterface, "name" | "description" | "date" | "trimester" | "scale" | "coefficient" | "schoolClassId" | "skills">;