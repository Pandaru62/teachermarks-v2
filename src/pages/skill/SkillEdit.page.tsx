import { useParams } from "react-router-dom";
import SkillForm from "../../components/forms/SkillForm";
import useSkillQuery from "../../hooks/skill/useSkillQuery";

export default function SkillEditPage() {

    const skillId = Number(useParams().id);
    const {skill, skillError, skillLoading} = useSkillQuery(skillId);

    return (
        <>
            {skillLoading && <p>Chargement en cours.</p>}
            {skillError && <p>Une erreur est survenue lors du chargement.</p>}
            {skill && (
                <SkillForm
                        initialValues={{ name: skill.name, description: skill.description, abbreviation: skill.abbreviation }}
                        editSkillId={skillId}
                />    
            )}
        </>
    )

}