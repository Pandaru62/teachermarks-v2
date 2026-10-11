import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createandPublishNotification } from '../../api/notifications';
import { useToast } from '../../contexts/ToastContext';

export const useNotificationForm = () => {
  
    const navigate = useNavigate();
    const { showToast } = useToast();

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
                showToast("Notification validée !", "success");
                void navigate("/");
            }
        }
    });

  return {
    formik
  };
};
