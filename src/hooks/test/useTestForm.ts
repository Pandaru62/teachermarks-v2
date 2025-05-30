import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../../utils/alerts/showSuccessAlert';
import { useQueryClient } from '@tanstack/react-query';
import SchoolClassInterface from '../../interfaces/schoolclass.interface';
import { createTest, editTest } from '../../api/tests';
import TestInterface, { TrimesterEnum } from '../../interfaces/test.interface';
import { useState } from 'react';

export interface TestFormProps {
  initialValues: { 
    name: string; 
    description: string;
    date: string;
    trimester: TrimesterEnum;
    schoolClass?: SchoolClassInterface;
    schoolClassId?: number;
    scale: number;
    coefficient: number;
  };
  editTestId?: number;
  schoolClasses? : SchoolClassInterface[]
}

export const useTestForm = (props : TestFormProps) => {
  const queryClient = useQueryClient();
  const {initialValues, editTestId } = props;
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState<{id: number, name: string}[]>([]);


  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Nom de l'évaluation requis"),
      description: Yup.string(),
      date: Yup.string().required("Veuillez saisir une date"),
      trimester: Yup.mixed<TrimesterEnum>().oneOf(Object.values(TrimesterEnum)),
      schoolClassId: Yup.number().required("Veuillez indiquer une classe"),
      scale: Yup.number().positive().required("Veuillez indiquer un barême"),
      coefficient: Yup.number().positive().required("Veuillez indiquer un coefficient"),
    }),
    onSubmit: async (values) => {
      if(editTestId) {
        const editedTest = await editTest(
          {
            ...values, schoolClassId: values.schoolClassId ?? 0, date: new Date(values.date), skills: selectedSkills
          },
          editTestId
        );
        if(editedTest) {
          // queryClient.setQueryData(['schoolClasses'], (oldSchoolClasses : SchoolClassInterface[]) =>
          //   oldSchoolClasses ? oldSchoolClasses.map((schoolClass) => schoolClass.id === editClassId ? editedClass : schoolClass) : []);

          // queryClient.setQueryData(['schoolClass', editClassId], editedClass);

          // showSuccessAlert("Evaluation modifiée avec succès !", () => navigate("/tests/" + editTestId));
        }
      } else {
        const formatDate = new Date(values.date).toISOString();
        const newTest = await createTest(
          {
            ...values, schoolClassId: values.schoolClassId ?? 0, date: formatDate, skills: selectedSkills
          });
        if (newTest) {

          queryClient.setQueryData(['tests'], (oldTests : TestInterface[]) =>
            oldTests ? [...oldTests, newTest] : [newTest]);

          queryClient.setQueryData(['test', newTest.id], newTest);

          showSuccessAlert("Evaluation créée avec succès !", () => navigate("/tests"));
        }
      }
    },
    
  });

  return {
    formik,
    selectedSkills,
    setSelectedSkills
  };
};
