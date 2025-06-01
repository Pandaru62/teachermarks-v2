import SkillInterface from "../../../interfaces/skill.interface";
import { SkillLevelEnum } from "../../../interfaces/student-test.interface";
import SkillBubble from "./skillBubble";

interface SkillAvgProps {
    calcAvg: {
        average: number;
        level: SkillLevelEnum;
    },
    skill: Partial<SkillInterface>
}

export default function SkillAverageLine(props : SkillAvgProps) {

    const {calcAvg, skill} = props;

    return (
        <li className="flex justify-start items-center gap-3">
            <SkillBubble
                letter={skill.abbreviation ?? "?"}
                level={calcAvg.level}
            />
            <span>{skill.name} : {calcAvg.average}</span>
        </li>
    )
}