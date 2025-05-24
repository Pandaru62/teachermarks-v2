import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../../utils/alerts/showSuccessAlert';
import { SkillFormProps } from '../../components/forms/SkillForm';
import { createSkill, editSkill } from '../../api/skill';
import { useQueryClient } from '@tanstack/react-query';

export const useSkillForm = (props : SkillFormProps) => {
  const {initialValues, editSkillId} = props;
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('Nom de la compétence requis'),
      abbreviation: Yup.string().required('Abbréviation requise'),
    }),
    onSubmit: async (values) => {
      if(editSkillId) {
        const editedSkill = await editSkill(
          {
            name : values.name,
            abbreviation : values.abbreviation,
            description : values.description
          },
          editSkillId
        );
        if(editedSkill) {
          queryClient.invalidateQueries({ queryKey: ['skill', editSkillId] });
          showSuccessAlert("Compétence modifiée avec succès !", () => navigate("/skills/" + editSkillId));
        }
      } else {
        const newSkill = await createSkill(
          {
              name : values.name,
              abbreviation : values.abbreviation,
              description : values.description
          });
        if (newSkill) {
          showSuccessAlert("Compétence créée avec succès !", () => navigate("/skills"));
        }
      }
    },
    
  });

  return {
    formik,
  };
};
