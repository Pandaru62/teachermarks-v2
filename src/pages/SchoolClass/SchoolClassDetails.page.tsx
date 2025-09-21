import { Card, IconButton, Typography } from "@material-tailwind/react";
import Wrapper from "../../components/ui/wrapper";
import ClassList from "../../components/classList";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";
import { useNavigate, useParams } from "react-router-dom";
import useSchoolClassQuery from "../../hooks/schoolClass/useSchoolClassQuery";
import BackButton from "../../components/ui/backButton";
import StudentsList from "../../components/ui/studentsList";
import useSchoolClassesQueries from "../../hooks/schoolClass/useSchoolClassesQueries";

export default function SchoolClasseDetailsPage() {

    const navigate = useNavigate();
    const formId = useParams().id;

    const {schoolClass, schoolClassLoading, schoolClassError} = useSchoolClassQuery(Number(formId));
    const { schoolClasses, schoolClassesError, schoolClassesLoading } = useSchoolClassesQueries()
    

    return(
        <>
        {schoolClassLoading && (<div>Chargement en cours</div>)}
        {schoolClassError && (<div>Une erreur s'est produite. Veuillez réessayer.</div>)}
        {schoolClass && (
            <Wrapper extraClass="flex flex-col gap-5">
                <Card 
                    className="mt-6 py-5 text-black flex justify-between items-center"
                    style={{ backgroundColor: schoolClass.color }}
                >
                    <div className="w-full flex gap-3 justify-around items-center">
                        <BackButton />
                        <h1 className="text-black">{schoolClass.name}</h1>
                        <IconButton color="white" className="rounded-xl" onClick={() => navigate(`/forms/${schoolClass.id}/add-students`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#F46030" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4"/></svg>
                        </IconButton>
                    </div>
                    <Typography as="p" className="text-xl font-semibold">Voilà les élèves de {schoolClass.name} !</Typography>
                    <div className="bg-white rounded-xl p-3 w-[90%] mt-3">
                        <StudentsList students={schoolClass.pupils}/>
                    </div>
                </Card>

                {schoolClassesError && (<p>Une erreur est survenue. Veuillez réessayer.</p>)}
                {schoolClassesLoading && (<p>Chargement en cours.</p>)}
                {schoolClasses && (
                    <ClassList schoolClasses={schoolClasses}/>
                )}
                
                <DefaultLinkButton
                    to={`/forms/${formId}/edit`}
                    height={75}
                    label="Modifier la classe"
                />

                
            </Wrapper>
        )}
    </> 
    )
}

