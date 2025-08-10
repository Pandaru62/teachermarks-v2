import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../../utils/alerts/showSuccessAlert';
import { editProfile } from '../../api/profile';
import { useAuthStore } from '../useAuthStore';
import ProfileInterface from '../../interfaces/profile.interface';


export const useProfileForm = (initialValues : Omit<ProfileInterface, "userId">) => {
  const { user, setUser } = useAuthStore();
  
  
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      firstname: Yup.string().required('Prénom requis'),
      lastname: Yup.string().required('Nom requis'),
      school: Yup.string().required('Etablissement requis'),
    }),
    onSubmit: async (values) => {
        if(user?.id) {
          const editedProfile = await editProfile(
          {
            firstname : values.firstname,
            lastname: values.lastname,
            school: values.school
          }, user.id);
        if(editedProfile) {
          setUser(editedProfile)
          showSuccessAlert("Profil modifié avec succès !", () => navigate("/"));
        }
        }
      }
    },
  );

  return {
    formik
  };
};
