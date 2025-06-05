import { IconButton } from "@material-tailwind/react";
import { SkillLevelEnum } from "../../../interfaces/student-test.interface";

interface SkillBubbleProps {
    level: SkillLevelEnum,
    label: string,
    isActive?: boolean,
    onClick: () => void
}

export default function SkillBubbleButton(props : SkillBubbleProps) {

    const {level, label, isActive = false, onClick} = props;
    

    let color = ''
    switch (level) {
        case SkillLevelEnum.LVL0:
            color = 'bg-black';
            break;
        case SkillLevelEnum.LVL1:
            color = 'bg-test-400';
            break;
        case SkillLevelEnum.LVL2:
            color = 'bg-test-300';
            break;
        case SkillLevelEnum.LVL3:
            color = 'bg-test-200';
            break;
        case SkillLevelEnum.LVL4:
            color = 'bg-test-600';
            break;
        case SkillLevelEnum.ABS:
            color = 'bg-blue-gray-300';
            break;
        default :
            color = 'bg-blue-gray-300';
    }

    return (
        <IconButton 
            key={level}
            className={`rounded-full ${!isActive ? "opacity-50" : color}`}
            variant={isActive ? "filled" : "outlined"}
            onClick={onClick}
        >
            <span className='font-logo'>
                {label}
            </span>
        </IconButton>
    )
}