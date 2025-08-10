import { useFormik } from 'formik';
import * as Yup from 'yup';
import { showSuccessAlert } from '../../utils/alerts/showSuccessAlert';
import { useAuthStore } from '../useAuthStore';
import { TrimesterEnum } from '../../interfaces/test.interface';
import { editPreferences } from '../../api/profile';


export const usePreferencesForm = () => {
  const { user, setUser } = useAuthStore();
  
  const initialValues = {
    current_trimester: TrimesterEnum.TR1
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      current_trimester: Yup.mixed().oneOf(Object.values(TrimesterEnum))
    }),
    onSubmit: async (values) => {
        if(user?.id) {
          const editedPreferences = await editPreferences(
          user.id,
          values.current_trimester
        );
        if(editedPreferences) {
          setUser({...user, current_trimester: values.current_trimester})
          showSuccessAlert("Préférences modifiées avec succès !");
        }
        }
      }
    },
  );

  return {
    formik
  };
};
