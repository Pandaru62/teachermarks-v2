import SkillForm from "../../components/forms/SkillForm";

export default function SkillListPage() {
    return (
        <SkillForm
                initialValues={{ name: "", description: "", abbreviation: "" }}
        />    
    )
}