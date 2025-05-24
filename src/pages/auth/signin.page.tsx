import {
    Card,
    CardBody,
    Typography,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import { useLoginPageService } from "./service/signin.service";
import { Link } from "react-router-dom";
import TextInput from "../../components/ui/formInput/textInput";
import BackButton from "../../components/ui/backButton";
import Wrapper from "../../components/ui/wrapper";

   
  export function SignInPage() {

    const { mutation, formik, rememberMe, setRememberMe } = useLoginPageService();

    return (
      <Wrapper>
          <form onSubmit={formik.handleSubmit} className="mt-5 flex flex-col justify-center items-center">
          <Card className="w-96 mt-5 bg-test-200">
          <CardBody className="flex flex-col gap-4 my-8">
            <div className="flex gap-4">
              <BackButton/>
              <Typography variant="h3" className="text-3xl text-black">
                Connexion
              </Typography>
            </div>
            <div>
              <TextInput 
                name="email" 
                type="text" 
                label="Mon adresse e-mail"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <Typography variant="small" color="pink" className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-6h2v2h-2zm0-10h2v8h-2z"/></svg> 
                  {formik.errors.email}
                </Typography>
              )}
            </div>
            <div>
              <TextInput
                name="password"
                type="password"
                label="Mon mot de passe"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <Typography variant="small" color="pink" className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-6h2v2h-2zm0-10h2v8h-2z"/></svg> 
                  {formik.errors.password}
                </Typography>
              )}
            </div> 
            <div className="ms-auto">
              <Checkbox
                id="rememberMe"
                label={<Typography color="black">Se souvenir de moi</Typography>}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </div>
          </CardBody>
        </Card>
        <h2 className="text-center mt-5">Je suis <i>enfin</i> prêt...</h2>
        <Button type="submit" className="rounded-[15px] custom-shadow h-[75px] bg-amber-custom text-black" size="lg" disabled={mutation.isPending}>
          <Typography className="font-[Teachers] font-extrabold text-4xl">{mutation.isPending ? "Connexion en cours..." : "Me connecter"}</Typography>
        </Button>
        {mutation.isError && (
        <Typography className="text-center" variant="small" color="red">
          {mutation.error.status === 401
            ? "Email ou mot de passe incorrect"
            : "Une erreur est survenue"}
        </Typography>
          )}
            <Typography variant="small" className="mt-2 flex justify-center">
              Je n'ai pas de compte.
              <Typography
                as="span"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                <Link to={"/signup"}>M'inscrire</Link>
              </Typography>
            </Typography>
        </form>
      </Wrapper>
      
    );
  }