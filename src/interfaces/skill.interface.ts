export default interface SkillInterface {
    id: number,
    name: string,
    abbreviation: string,
    description: string,
    isArchived: boolean,
    created_at?: Date | string,
    updated_at?: Date | string,
    userId?: number
}

export type CreateSkillInterface = Pick<SkillInterface, "name" | "description" | "abbreviation">;

export type EditSkillInterface = Pick<SkillInterface, "name" | "description" | "abbreviation">;