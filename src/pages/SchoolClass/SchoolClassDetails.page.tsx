import { Card, Typography } from "@material-tailwind/react";
import Wrapper from "../../components/ui/wrapper";
import ClassList from "../../components/classList";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";
import { useParams } from "react-router-dom";
import useSchoolClassQuery from "../../hooks/schoolClass/useSchoolClassQuery";
import BackButton from "../../components/ui/backButton";

export default function SchoolClasseDetailsPage() {

    const formId = useParams().id;
    console.log("🚀 ~ SchoolClasseDetailsPage ~ formId:", formId)

    const {schoolClass, schoolClassLoading, schoolClassError} = useSchoolClassQuery(Number(formId));
    console.log("🚀 ~ SchoolClasseDetailsPage ~ schoolClass:", schoolClass)


    return(
        <>
        {schoolClass && (
            <Wrapper extraClass="flex flex-col gap-5">
                <Card 
                    className="mt-6 py-5 text-black flex justify-between items-center"
                    style={{ backgroundColor: schoolClass.color }}
                >
                    <div className="flex gap-3">
                        <BackButton/>
                        <h1 className="text-black">{schoolClass.name}</h1>
                    </div>
                    <Typography as="p" className="text-xl font-semibold">Voilà les élèves de {schoolClass.name} !</Typography>
                    <div className="bg-white rounded-xl p-5 w-4/5 mt-3">
                        <table className="w-full min-w-max table-auto text-left">
                            <tbody>
                            {schoolClass.pupils.map(({ lastName, firstName, id }) => (
                                <tr key={id} className="even:bg-test-200 bg-opacity-60">
                                    <td className="w-1/2 p-2 border-r-8 border-white text-center">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                        {lastName}
                                        </Typography>
                                    </td>
                                    <td className="w-1/2 p-2 text-center">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                        {firstName}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <ClassList/>
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

