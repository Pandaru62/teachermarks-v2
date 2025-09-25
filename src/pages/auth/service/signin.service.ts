import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signin } from "./auth.service";
import { useAuthStore, UserWithoutPassword } from "../../../hooks/useAuthStore";

export interface LoginFormValues {
  email: string;
  password: string;
}

export function useLoginPageService() {
  const navigate = useNavigate();
  
  // Lire la valeur initiale depuis localStorage
  const savedEmail = localStorage.getItem("email");
  const [rememberMe, setRememberMe] = useState(!!savedEmail);

  const mutation = useMutation({
    mutationFn: async (values: LoginFormValues) => {
      const dataToSubmit = {
        email: values.email,
        password: values.password,
      };
      const response = await signin(dataToSubmit);
      return {
        user: response.data.user,
        accessToken: response.data.access_token
      };
    },
    onSuccess: (data: { user: UserWithoutPassword; accessToken: string }) => {
      useAuthStore.getState().login(data.user, data.accessToken);
      navigate("/");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      throw new Error(error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: savedEmail ?? "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Format d'email invalide")
        .matches(/\.[A-Za-z]{2,}$/, "Le domaine de l'email est invalide")
        .required("Requis"),
      password: Yup.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .required("Requis"),
    }),
    onSubmit: async (values) => {
      // Gérer le stockage de l'email lors du submit
      if (rememberMe) {
        localStorage.setItem("email", values.email);
      } else {
        localStorage.removeItem("email");
      }
      mutation.mutate(values);
    },
  });

  // Gérer automatiquement le stockage/suppression quand rememberMe change
  useEffect(() => {
    if (!rememberMe) {
      localStorage.removeItem("email");
    } else if (formik.values.email) {
      localStorage.setItem("email", formik.values.email);
    }
  }, [rememberMe, formik.values.email]);

  return { mutation, formik, rememberMe, setRememberMe };
}
