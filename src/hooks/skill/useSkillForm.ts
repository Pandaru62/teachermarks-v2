import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { SkillFormProps } from '../../components/forms/SkillForm';
import { createSkill, editSkill } from '../../api/skill';
import { useQueryClient } from '@tanstack/react-query';
import SkillInterface from '../../interfaces/skill.interface';
import { useToast } from '../../contexts/ToastContext';

export const useSkillForm = (props : SkillFormProps) => {
  const {initialValues, editSkillId} = props;
  const queryClient = useQueryClient();
  const { showToast } = useToast();

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

          showToast("Compétence modifiée avec succès !", "success");
          void navigate("/skills/");
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
          showToast("Compétence créée avec succès !", "success");
          void navigate("/skills");
        }
      }
    },
    
  });

  return {
    formik,
  };
};
