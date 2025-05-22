import {
    Card,
    CardBody,
    Typography,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import TextInput from "../../components/ui/formInput/textInput";
import { useState } from "react";
import { useSignUpPageService } from "./service/signup.service";
import BackButton from "../../components/ui/backButton";

   
  export function SignUpPage() {

    const { mutation, formik } = useSignUpPageService();
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    return (
      <form onSubmit={formik.handleSubmit} className="mt-5 flex flex-col justify-center items-center">
        <Card className="w-96 mt-5 bg-test-200">
        <CardBody className="flex flex-col gap-4 my-8">
          <div className="flex gap-4">
            <BackButton/>
            <Typography variant="h3" className="text-3xl text-black">
              Inscription
            </Typography>
          </div>
          <div>
            <TextInput 
              name="email" 
              type="text" 
              label="Mon adresse e-mail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.errors.email}
            />
          </div>
          <div>
            <TextInput
              name="password"
              type="password"
              label="Mon mot de passe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.errors.password}
            />
          </div> 
          <div>
            <TextInput
              name="password-confirm"
              type="password"
              label="Confirmer mon mot de passe"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
            {formik.values.password !== confirmPassword && (
              <Typography variant="small" color="pink" className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-6h2v2h-2zm0-10h2v8h-2z"/></svg> 
                Les mots de passe sont différents.
              </Typography>
            )}
          </div> 
          <div className="ms-auto">
            <Checkbox
              id="acceptTerms"
              label={<Typography color="black">Accepter les termes et conditions.</Typography>}
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
          </div>
        </CardBody>
      </Card>
      <h2 className="text-center mt-5">Je suis <i>presque</i> prêt...</h2>
      <Button type="submit" className="rounded-[15px] custom-shadow h-[75px] bg-amber-custom text-black" size="lg" disabled={mutation.isPending || !termsAccepted || formik.values.email == '' || formik.values.password == '' || formik.values.password !== confirmPassword}>
        <Typography className="font-[Teachers] font-extrabold text-4xl">{mutation.isPending ? "Inscription en cours..." : "M'inscrire"}</Typography>
      </Button>
      {mutation.isError && (
      <Typography className="text-center" variant="small" color="red">
        {mutation.error.status === 401
          ? "Email ou mot de passe incorrect"
          : "Une erreur est survenue"}
      </Typography>
        )}
          <Typography variant="small" className="mt-2 flex justify-center">
            J'ai déjà un compte.
            <Typography
              as="span"
              href="#signin"
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold"
            >
              <Link to={"/signin"}>Me connecter</Link>
            </Typography>
          </Typography>
      </form>
    );
  }