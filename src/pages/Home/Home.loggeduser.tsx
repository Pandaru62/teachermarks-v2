import { Button, Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useStore } from "zustand";
import { useAuthStore } from "../../hooks/useAuthStore";
import TutoAlert from "../../components/ui/tutoAlert";

export default function HomeLoggedUser() {

    const currentUser = useStore(useAuthStore);

    return(
        <div className="grid grid-rows-3">
            {currentUser.user?.is_first_visit && (
                <TutoAlert/>
            )}
            <Card className="row-span-2 mt-6 py-5 px-4 bg-test-200 text-black flex justify-between items-center">
                <h1 className="text-black">Bienvenue</h1>
                <Typography as="h2" className="text-xl font-semibold">Bonjour <span className="text-test-400">{currentUser.user?.firstname} {currentUser.user?.lastname}</span> !</Typography>
                <img src="\src\assets\smiling_postit.svg" alt="smiling post-it"/>
                {currentUser.user?.is_first_visit ? (
                <>
                    <Typography as="p" className="text-xl text-center">Vous êtes sur le point de commencer un suivi plus intuitif et rapide des compétences de vos élèves.</Typography>
                    <Typography as="p" className="text-xl font-semibold text-center">Nous vous invitons à ajouter vos premières informations.</Typography>  
                </>) : (
                <>
                    <Typography as="p" className="text-xl text-center">Vos élèves viennent d'être évalués ?</Typography>
                    <Typography as="p" className="text-xl font-semibold text-center">N'oubliez pas de <br/> MARKER leurs succès.</Typography>
                </>
                )}
            </Card>

            <div className="row-span-1 flex flex-col mt-5 gap-5 lg:flex-row items-stretch justify-center">
                <Link to="/forms" className="h-[75px] lg:w-1/2">
                    <Button className="w-full rounded-[15px] custom-shadow  bg-test-300 text-black" size="lg">
                        <Typography className="font-[Teachers] font-extrabold text-2xl">Mes classes</Typography>
                    </Button>
                </Link>
                {currentUser.user?.is_first_visit ? (
                <Link to="/skills" className="h-[75px] lg:w-1/2">
                    <Button className="w-full rounded-[15px] custom-shadow  bg-test-300 text-black" size="lg">
                        <Typography className="font-[Teachers] font-extrabold text-2xl">Mes compétences</Typography>
                    </Button>
                </Link>
                ) : (
                <Link to="/tests/new" className="h-[75px] lg:w-1/2">
                    <Button className="w-full rounded-[15px] custom-shadow bg-test-400 bg-opacity-80 text-black" size="lg">
                        <Typography className="font-[Teachers] font-extrabold text-2xl">Nouvelle évaluation</Typography>
                    </Button>
                </Link>
                )}
            </div>

        </div>
    )
}