import { useParams } from "react-router-dom";
import Wrapper from "../../components/ui/wrapper";
import useStudentQuery from "../../hooks/student/useStudentQuery";

export default function StudentDetailsPage() {

    const studentId = Number(useParams().id);
    const {student, studentError,studentLoading} = useStudentQuery(studentId);

    return (
       <Wrapper>
            {studentLoading && (<div>Chargement en cours.</div>)}
            {studentError && (<div>Une erreur s'est produite.</div>)}
            {student && (
                <>
                    <h1>Classe : {student?.classes ? student.classes[0] : "?"}</h1>
                    <h2>Elève : {student.lastName} {student.firstName}</h2>
                </>
            )}
       </Wrapper>
    )


}