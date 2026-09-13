import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "./auth.service";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export interface SignUpFormValues {
  email: string;
  password: string;
  login: string;
}

export function useSignUpPageService() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (values: SignUpFormValues) => {
      const dataToSubmit = {
        email: values.email,
        password: values.password,
        login: values.login
      };
      const response = await signup(dataToSubmit);
      return response;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Compte créé avec succès",
        text: `Votre compte a bien été créé. Vous pouvez désormais vous connecter avec vos identfiants.`,
        icon: "success"
      });
      navigate("/signin");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      throw new Error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      login: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Format d'email invalide")
        .matches(/\.[A-Za-z]{2,}$/, "Le domaine de l'email est invalide")
        .required("Une adresse e-mail est requise"),
      password: Yup.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .required("Un mot de passe est requis"),
      login: Yup.string()
        .min(4, "Le pseudo doit contenir au moins 4 caractères")
        .required("Un pseudo de connexion est requis"),
    }),
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
  });

  
  return { mutation, formik };
}
