import { useNavigate, useParams } from "react-router-dom";
import useStudentQuery from "../../hooks/student/useStudentQuery";
import Wrapper from "../../components/ui/wrapper";
import { Card, IconButton } from "@material-tailwind/react";
import BackButton from "../../components/ui/backButton";
import StudentForm from "../../components/forms/StudentForm";
import { showWarningAlert } from "../../utils/alerts/warningAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import StudentInterface from "../../interfaces/student.interface";
import { deleteStudent } from "../../api/student";
import { showSuccessAlert } from "../../utils/alerts/showSuccessAlert";

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
        alert("Supprimer ?")
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
                        <IconButton color="white" className={`rounded-xl`} onClick={() => handleConfirmDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"></path></svg>
                        </IconButton>
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