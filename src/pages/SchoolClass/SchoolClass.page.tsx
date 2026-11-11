import Wrapper from "../../components/ui/wrapper";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";
import useSchoolClassesQueries from "../../hooks/schoolClass/useSchoolClassesQueries";
import { Typography } from "@material-tailwind/react";
import SchoolClassCards from "../../components/ui/SchoolClassCards";
import smilingPostit from "../../assets/smiling_postit.svg";

export default function SchoolClassPage() {

    const { schoolClasses, schoolClassesError, schoolClassesLoading } = useSchoolClassesQueries()

    return(
        <Wrapper extraClass="flex flex-col gap-5">

            <div className="flex flex-col sm:flex-row justify-between sm:items-center bg-test-100/10 border border-test-100/15 rounded-2xl px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-test-100/15 flex items-center justify-center">
                        <img src={smilingPostit} alt="" className="w-6 h-6" />
                    </div>
                    <Typography as="h2" className="text-lg font-semibold text-test-100">
                        Mes classes
                    </Typography>
                </div>
                <Typography className="text-sm text-test-100/70">
                    {schoolClasses && schoolClasses.length > 0 ? 
                        "Vos élèves n'attendent plus que vous !" : 
                        "Vous n'avez pas encore de classe en charge"
                    }
                </Typography>
            </div>

            <div>
                {schoolClassesError && (<p>Une erreur est survenue. Veuillez réessayer.</p>)}
                {schoolClassesLoading && (<p>Chargement en cours.</p>)}
                {schoolClasses && (
                <SchoolClassCards schoolClasses={schoolClasses || []} />
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

