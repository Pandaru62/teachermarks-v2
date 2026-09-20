import { KeyboardEvent } from "react";
import { SkillLevelEnum } from "../interfaces/student-test.interface";


export const SKILL_INPUT_VALUES = ["0", "1", "2", "3", "4"];


export const skillLevelToInputValue = (
    level: SkillLevelEnum
): string => {
    switch (level) {
        case SkillLevelEnum.LVL0:
            return "0";
        case SkillLevelEnum.LVL1:
            return "1";
        case SkillLevelEnum.LVL2:
            return "2";
        case SkillLevelEnum.LVL3:
            return "3";
        case SkillLevelEnum.LVL4:
            return "4";
        default:
            return "";
    }
};


export const inputValueToSkillLevel = (
    value: string
): SkillLevelEnum => {
    switch (value) {
        case "0":
            return SkillLevelEnum.LVL0;
        case "1":
            return SkillLevelEnum.LVL1;
        case "2":
            return SkillLevelEnum.LVL2;
        case "3":
            return SkillLevelEnum.LVL3;
        case "4":
            return SkillLevelEnum.LVL4;
        default:
            return SkillLevelEnum.NN;
    }
};


// Empêche la saisie de tout caractère qui n'est pas un niveau valide
// dans les inputs de compétence, sans bloquer Tab/Backspace/flèches.
export const handleSkillKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
) => {

    if (
        event.key === "Tab" ||
        event.key === "Backspace" ||
        event.key === "Delete" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    ) {
        return;
    }

    const key = event.key.toUpperCase();

    if (!SKILL_INPUT_VALUES.includes(key)) {
        event.preventDefault();
    }

};
