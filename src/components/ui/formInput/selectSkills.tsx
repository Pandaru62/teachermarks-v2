import { IconButton } from "@material-tailwind/react";
import SkillInterface from "../../../interfaces/skill.interface";

interface PropsInterface {
    label: string;
    skills: SkillInterface[];
    name: string;
    selectedSkills: Pick<SkillInterface, "id" | "name" | "abbreviation">[];
    setSelectedSkills: React.Dispatch<React.SetStateAction<Pick<SkillInterface, "id" | "name" | "abbreviation">[]>>;
}

export default function SelectSkills(props: PropsInterface) {
    const { label, skills, name, selectedSkills, setSelectedSkills } = props;

    const handleSkillSelection = (skill: Pick<SkillInterface, "id" | "name" | "abbreviation">) => {
        const isSelected = selectedSkills.some((s) => s.id === skill.id);

        if (isSelected) {
            setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="text-xl font-semibold text-black text-center mb-1">
                {label}
            </label>
            <div className="bg-white rounded-xl p-2 flex justify-around">
                {skills?.map((skill) => {
                    const isSelected = selectedSkills.some((s) => s.id === skill.id);
                    return (
                        <IconButton
                            key={skill.id}
                            ripple={false}
                            className={`
                                rounded-full
                                ${isSelected ? 'bg-test-400 opacity-100' : 'bg-test-300 opacity-40 focus:opacity-40 text-black'}
                            `}
                            onClick={() => handleSkillSelection({ id: skill.id, name: skill.name, abbreviation: skill.abbreviation })}
                        >
                            <span className="text-xs font-logo">{skill.abbreviation}</span>
                        </IconButton>
                    );
                })}
            </div>
        </div>
    );
}
