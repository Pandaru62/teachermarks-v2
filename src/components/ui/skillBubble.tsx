interface SkillBubbleProps {
    color: "bg-test-400" | "bg-test-300" | "bg-test-200" | "bg-test-600",
    letter: string
}

export default function SkillBubble(props : SkillBubbleProps) {

    const {color, letter} = props;

    return (
        <div className={`rounded-full h-6 w-6 text-center ${color}`}>
            <span className={color === 'bg-test-600' ? `text-xs font-logo text-white` : `text-xs font-logo`}>{letter}</span>
        </div>
    )
}