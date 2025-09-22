import { useNavigate, useParams } from "react-router-dom";
import useStudentQuery from "../../hooks/student/useStudentQuery";
import Wrapper from "../../components/ui/wrapper";
import { Card } from "@material-tailwind/react";
import BackButton from "../../components/ui/backButton";
import StudentForm from "../../components/forms/StudentForm";
import { showWarningAlert } from "../../utils/alerts/warningAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StudentInterface from "../../interfaces/student.interface";
import { deleteStudent } from "../../api/student";
import { showSuccessAlert } from "../../utils/alerts/showSuccessAlert";
import DefaultIconButton from "../../components/ui/defaultIconButton";

export default function StudentEditPage() {

    const navigate = useNavigate();
    const studentId = Number(useParams().id);
    const {student, studentError,studentLoading} = useStudentQuery(studentId);

    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: deleteStudent,
        onSuccess: (deletedStudent: StudentInterface) => {
        queryClient.setQueryData(['students'], (oldStudents : StudentInterface[]) =>
            oldStudents ? oldStudents.filter((student) => student.id !== deletedStudent.id) : []);
        
        showSuccessAlert("L'élève a été supprimé", () => navigate("/forms/"));
        },
    });
    
    const handleConfirmDelete = () => {
        showWarningAlert("Voulez-vous vraiment supprimer cet élève ?", () => mutation.mutate(studentId), "Elève supprimé avec succès")
    }

    return (
       <Wrapper>
            {studentLoading && (<div>Chargement en cours.</div>)}
            {studentError && (<div>Une erreur s'est produite.</div>)}
            {student && (
                <Card className={`mt-6 py-5 bg-test-200 text-black flex p-5`}>
                    <div className="flex gap-5 justify-between">
                        <BackButton/>
                        <h1 className="text-black">Modifier un élève</h1>
                        <DefaultIconButton onClick={handleConfirmDelete} />
                    </div>
                    <StudentForm
                        initialValues={{firstName: student.firstName, lastName: student.lastName}}
                        editStudentId={student.id}
                    />
                </Card>
            )}
       </Wrapper>
    )


}