import SkillForm from "../../components/forms/SkillForm";

export default function SkillAddPage() {
    return (
        <SkillForm
                initialValues={{ name: "", description: "", abbreviation: "" }}
        />    
    )
}