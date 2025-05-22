import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { createSchoolClass } from '../api/schoolclass';

export const useSchoolClassForm = () => {
  const [selectedColor, setSelectedColor] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleColorChange = (color: string) => {
    setCustomColor('');
    setSelectedColor(color);
  };

  const handleCustomizedColorChange = (color: string) => {
    setCustomColor(color);
    setSelectedColor(color);
  };

  const formik = useFormik({
    initialValues: {
      class_name: '',
    },
    validationSchema: Yup.object({
      class_name: Yup.string().required('Nom de la classe requis'),
    }),
    onSubmit: (values) => {
      createSchoolClass(
        {
            name : values.class_name,
            color: selectedColor,
            formId : 1
        });
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
