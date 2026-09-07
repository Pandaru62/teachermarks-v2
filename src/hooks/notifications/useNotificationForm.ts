import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../../utils/alerts/showSuccessAlert';
import { createandPublishNotification } from '../../api/notifications';

export const useNotificationForm = () => {
  
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: "",
            message: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Titre requis'),
            message: Yup.string().required('Nom requis'),
        }),
        onSubmit: async (values) => {
            const newNotif = 
            await createandPublishNotification(
                {
                    title : values.title,
                    message: values.message,
                }
            );
            if(newNotif) {
                showSuccessAlert("Notification validée !", () => navigate("/"));
            }
        }
    });

  return {
    formik
  };
};
