import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { createSchoolClass, editSchoolClass } from '../../api/schoolclass';
import { useNavigate } from 'react-router-dom';
import { showSuccessAlert } from '../../utils/alerts/showSuccessAlert';
import { useQueryClient } from '@tanstack/react-query';
import SchoolClassInterface from '../../interfaces/schoolclass.interface';

interface SchoolClassFormProps {
  initialValues: { class_name: string; color: string };
  editClassId?: number;
}

export const useSchoolClassForm = (props : SchoolClassFormProps) => {
    const queryClient = useQueryClient();
  const {initialValues, editClassId} = props;
  const [selectedColor, setSelectedColor] = useState(initialValues.color ?? "");
  const [customColor, setCustomColor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleColorChange = (color: string) => {
    setCustomColor('');
    setSelectedColor(color);
  };

  const handleCustomizedColorChange = (color: string) => {
    setCustomColor(color);
    setSelectedColor(color);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      class_name: Yup.string().required('Nom de la classe requis'),
    }),
    onSubmit: async (values) => {
      if(editClassId) {
        const editedClass = await editSchoolClass(
          {
            name : values.class_name,
            color: selectedColor,
            isArchived: false
          },
          editClassId
        );
        if(editedClass) {

          queryClient.setQueryData(['schoolClasses'], (oldSchoolClasses : SchoolClassInterface[]) =>
            oldSchoolClasses ? oldSchoolClasses.map((schoolClass) => schoolClass.id === editClassId ? editedClass : schoolClass) : []);

          queryClient.setQueryData(['schoolClass', editClassId], editedClass);

          showSuccessAlert("Classe modifiée avec succès !", () => navigate("/forms/" + editClassId));
        }
      } else {
        const newClass = await createSchoolClass(
          {
              name : values.class_name,
              color: selectedColor,
              formId : 1
          });
        if (newClass) {

          queryClient.setQueryData(['schoolClasses'], (oldSchoolClasses : SchoolClassInterface[]) =>
            oldSchoolClasses ? [...oldSchoolClasses, newClass] : [newClass]);

          queryClient.setQueryData(['schoolClass', newClass.id], newClass);

          showSuccessAlert("Classe créée avec succès !", () => navigate("/forms"));
        }
      }
    },
    
  });

  return {
    formik,
    selectedColor,
    customColor,
    isModalOpen,
    setIsModalOpen,
    handleColorChange,
    handleCustomizedColorChange,
  };
};
