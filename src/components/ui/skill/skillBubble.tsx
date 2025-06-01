import { SkillLevelEnum } from "../../../interfaces/student-test.interface";

interface SkillBubbleProps {
    level: SkillLevelEnum,
    letter: string,
    bubbleSize?: number,
    textSize?: 'xs' | 'sm' | 'lg'
}

export default function SkillBubble(props : SkillBubbleProps) {

    const {level, letter, bubbleSize = 6, textSize = 'xs'} = props;

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
            color = 'bg-test-50 opacity-50';
            break;
        default :
            color = 'bg-test-50 opacity-50';
    }

    return (
        <div className={`rounded-full h-${bubbleSize} w-${bubbleSize} my-1 ${color} flex justify-center items-center`}>
            <span className={color === 'bg-test-600' || color === 'bg-black' || color === 'bg-test-100' ? `text-${textSize} font-logo text-white` : `text-${textSize} font-logo`}>{letter}</span>
        </div>
    )
}