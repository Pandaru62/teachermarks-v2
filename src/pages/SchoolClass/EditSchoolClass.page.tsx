import { useParams } from "react-router-dom";
import SchoolClassForm from "../../components/forms/SchoolClassForm";
import useSchoolClassQuery from "../../hooks/schoolClass/useSchoolClassQuery";

export default function EditSchoolClassPage() {

    const classId = Number(useParams().id);
    const {schoolClass, schoolClassError, schoolClassLoading} = useSchoolClassQuery(classId);
    return (
        <>
            {schoolClassLoading && <p>Chargement en cours.</p>}
            {schoolClassError && <p>Une erreur est survenue lors du chargement.</p>}
            {schoolClass &&
                (
                    <SchoolClassForm
                        initialValues={{ class_name: schoolClass.name, color: schoolClass.color }}
                        editClassId={classId}
                    />
                )
            }
        </>
    )
    
}

