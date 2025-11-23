import Wrapper from "../../components/ui/wrapper";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";
import ClassList from "../../components/classList";
import TopCard from "../../components/ui/topCard";
import useSchoolClassesQueries from "../../hooks/schoolClass/useSchoolClassesQueries";
import { Typography } from "@material-tailwind/react";


export default function SchoolClassPage() {

    const { schoolClasses, schoolClassesError, schoolClassesLoading } = useSchoolClassesQueries()


    return(
        <Wrapper extraClass="flex flex-col gap-5">

            <TopCard
                cardClass=""
                title1 = "Mes classes"
                title2= "Bienvenue"
                paragraph={
                    schoolClasses && schoolClasses.length > 0 ? 
                    "Vos élèves n'attendent plus que vous !" : 
                    "Vous n'avez pas encore de classe en charge"
                }
            />

            <div>
                {schoolClassesError && (<p>Une erreur est survenue. Veuillez réessayer.</p>)}
                {schoolClassesLoading && (<p>Chargement en cours.</p>)}
                {schoolClasses && (
                <ClassList schoolClasses={schoolClasses}/>
                )}
            </div>
            
            <div>
            {schoolClasses?.length === 0 && (
                <Typography className="text-center font-semibold">
                    Timéo cherche sa classe
                </Typography>
            )}
                <DefaultLinkButton
                    label="Ajouter une classe"
                    height={75}
                    to="/forms/new"
                />
            </div>
           
        </Wrapper>
    )
}

