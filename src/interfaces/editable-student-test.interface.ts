import { SkillLevelEnum } from "./student-test.interface";


/*
|--------------------------------------------------------------------------
| État d'un élève pendant l'édition du tableau de résultats
|--------------------------------------------------------------------------
*/

export type EditableStudentTest = {
    mark: number | null;
    isAbsent: boolean;
    isUnmarked: boolean;
    comment: string;
    skills: Record<number, SkillLevelEnum>;
};


// Forme attendue par l'API (editStudentTest) : skills en tableau
// {skillId, level} plutôt qu'en Record indexé par skillId.
export type StudentTestPayload = {
    mark: number;
    isUnmarked: boolean;
    isAbsent: boolean;
    skills: { skillId: number; level: SkillLevelEnum }[];
    comment: string;
};


export const toStudentTestPayload = (
    edited: EditableStudentTest
): StudentTestPayload => ({
    mark: edited.mark ?? 0,
    isUnmarked: edited.isUnmarked,
    isAbsent: edited.isAbsent,
    comment: edited.comment,
    skills: Object.entries(edited.skills).map(([skillId, level]) => ({
        skillId: Number(skillId),
        level,
    })),
});

export type BatchStudentTestPayload = StudentTestPayload & {
    studentId: number;
};
 
export const toBatchStudentTestPayload = (
    studentId: number,
    edited: EditableStudentTest
): BatchStudentTestPayload => ({
    studentId,
    ...toStudentTestPayload(edited),
});
