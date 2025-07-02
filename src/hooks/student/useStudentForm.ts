import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../../utils/alerts/showSuccessAlert';
import { useQueryClient } from '@tanstack/react-query';
import { StudentFormProps } from '../../components/forms/StudentForm';
import { editStudent } from '../../api/student';
import StudentInterface from '../../interfaces/student.interface';

export const useStudentForm = (props : StudentFormProps) => {
  const {initialValues, editStudentId} = props;
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      lastName: Yup.string().required('Nom requis'),
      firstName: Yup.string().required('Prénom requis'),
    }),
    onSubmit: async (values) => {
      if(editStudentId) {
        const editedStudent = await editStudent(
          {
            lastName : values.lastName,
            firstName : values.firstName
          },
          editStudentId
        );
        if(editedStudent) {
          queryClient.setQueryData(['students'], (oldStudents : StudentInterface[]) =>
          oldStudents ? oldStudents.map((student) => student.id === editStudentId ? editedStudent : student) : []);

          queryClient.setQueryData(['student', editStudentId], editedStudent)

          showSuccessAlert("Elève modifié avec succès !", () => navigate("/student/" + editStudentId));
        }
      }
    }
    
  });

  return {
    formik,
  };
};
