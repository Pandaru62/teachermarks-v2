import { useEffect, useState } from "react";
import SkillList from "../../components/skillList";
import TopCard from "../../components/ui/topCard";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";
import useSkillsQuery from "../../hooks/skill/useSkillsQuery";

export default function SkillListPage() {

    const { skills, skillsError, skillsLoading } = useSkillsQuery()
    

    const [title2, setTitle2] = useState<string>("Attention");
    const [paragraph, setParagraph] = useState<string>("Vous n'avez pas encore renseigné de compétences.");
    useEffect(() => {
        if(skills) {
            setTitle2("Bonjour");
            setParagraph("Voici les compétences que vous évaluez.")
        }
    }, [skills])

    return (
        <div>
            <TopCard
                cardClass="h-[50vh]"
                title1 = "Mes compétences"
                title2= {title2}
                paragraph={paragraph}
            />
            <SkillList 
                skills={skills}
            />
            <DefaultLinkButton
                to="/skills/new"
                label="ajouter une compétence"
                height={60}
            />
        </div>
    )
}