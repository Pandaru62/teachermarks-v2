import { Button, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import SkillInterface from "../interfaces/skill.interface"

interface SkillListProps {
    skills: SkillInterface[]
}

export default function SkillList(props : SkillListProps) {

    const {skills} = props;

    return (
    <>
        <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-3">
        {skills?.map((skill) => (
            <Link to={`/skills/${skill.id}`} key={skill.id}>
                <Button className="w-full rounded-[15px] custom-shadow" size="lg" >
                    <Typography className="font-extrabold text-2xl">{skill.name}</Typography>
                </Button>
            </Link>
            ))}
        </div>

        <div className="lg:hidden relative w-full p-2 rounded-xl">
            <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-4 hide-scrollbar">
                {skills?.map((skill) => (
                <Link
                    to={`/skills/${skill.id}`}
                    key={skill.id}
                    className="snap-start shrink-0"
                >
                    <Button
                        className="rounded-[15px] custom-shadow bg-test-200 bg-opacity-60 text-black h-[75px]"
                        size="lg"
                    >
                        <Typography className="font-semibold text-lg">
                            {skill.name}
                        </Typography>
                    </Button>
                </Link>
                ))}
            </div>
        </div>
    </>
  
    )
}