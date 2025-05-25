import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../../utils/alerts/showSuccessAlert';
import { SkillFormProps } from '../../components/forms/SkillForm';
import { createSkill, editSkill } from '../../api/skill';
import { useQueryClient } from '@tanstack/react-query';
import SkillInterface from '../../interfaces/skill.interface';

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
          queryClient.setQueryData(['skills'], (oldSkills : SkillInterface[]) =>
          oldSkills ? oldSkills.map((skill) => skill.id === editSkillId ? editedSkill : skill) : []);

          queryClient.setQueryData(['skill', editSkillId], editedSkill)

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
          queryClient.setQueryData(['skills'], (oldSkills?: SkillInterface[]) =>
            oldSkills ? [...oldSkills, newSkill] : [newSkill]
          );

          queryClient.setQueryData(['skill', newSkill.id], newSkill);
          showSuccessAlert("Compétence créée avec succès !", () => navigate("/skills"));
        }
      }
    },
    
  });

  return {
    formik,
  };
};
