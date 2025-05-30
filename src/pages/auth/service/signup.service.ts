import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signup } from "./auth.service";
import Swal from 'sweetalert2';

export interface LoginFormValues {
  email: string;
  password: string;
}

export function useSignUpPageService() {

  const mutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const dataToSubmit = {
        email: values.email,
        password: values.password,
      };
      const response = await signup(dataToSubmit);
      return response;
    },
    onSuccess: (response : any) => {
      Swal.fire({
        title: "Compte créé avec succès",
        text: `Un e-mail de validation vient d'être envoyé à l'adresse ${response.email}. Veuillez cliquer sur le lien pour activer votre compte et vous connecter.`,
        icon: "success"
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      throw new Error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Format d'email invalide")
        .matches(/\.[A-Za-z]{2,}$/, "Le domaine de l'email est invalide")
        .required("Une adresse e-mail est requise"),
      password: Yup.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .required("Un mot de passe est requis"),
    }),
    onSubmit: async (values) => {
      mutation.mutate(values);
    },
  });

  
  return { mutation, formik };
}
