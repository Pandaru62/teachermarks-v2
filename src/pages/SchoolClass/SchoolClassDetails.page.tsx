import { Card, IconButton, Typography } from "@material-tailwind/react";
import Wrapper from "../../components/ui/wrapper";
import ClassList from "../../components/classList";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/ui/backButton";
import useSchoolClassesQueries from "../../hooks/schoolClass/useSchoolClassesQueries";
import useSchoolClassWithAvgQuery from "../../hooks/schoolClass/useSchoolClassQueryWithAvg";

function isDarkColor(hex :string) : boolean {
    // Remove the leading # if present
    hex = hex.replace('#', '');

    // Handle shorthand format (#abc → #aabbcc)
    if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
    }

    // Convert to RGB values
    const r = Number.parseInt(hex.substring(0, 2), 16);
    const g = Number.parseInt(hex.substring(2, 4), 16);
    const b = Number.parseInt(hex.substring(4, 6), 16);

    // Calculate luminance (Perceived brightness)
    // Formula from WCAG
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);

    // Return true if color is dark
    return luminance < 128; // You can adjust threshold
}

export default function SchoolClasseDetailsPage() {

    const navigate = useNavigate();
    const formId = useParams().id;

    const {schoolClassWithAverages, schoolClassLoading, schoolClassError} = useSchoolClassWithAvgQuery(Number(formId));
    const { schoolClasses, schoolClassesError, schoolClassesLoading } = useSchoolClassesQueries()

    return(
        <>
        {schoolClassLoading && (<div>Chargement en cours</div>)}
        {schoolClassError && (<div>Une erreur s'est produite. Veuillez réessayer.</div>)}
        {schoolClassWithAverages && (
            <Wrapper extraClass="flex flex-col gap-5">
                <Card 
                    className="mt-6 py-5 text-black flex justify-between items-center"
                    style={{ backgroundColor: schoolClassWithAverages.color }}
                >
                    <div className="w-full flex gap-3 justify-around items-center">
                        <BackButton />
                        <h1 className={isDarkColor(schoolClassWithAverages.color) ? "text-white" : "text-black"}>{schoolClassWithAverages.name}</h1>
                        <IconButton color="white" className="rounded-xl" onClick={() => navigate(`/forms/${schoolClassWithAverages.id}/add-students`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#F46030" d="M15 14c-2.67 0-8 1.33-8 4v2h16v-2c0-2.67-5.33-4-8-4m-9-4V7H4v3H1v2h3v3h2v-3h3v-2m6 2a4 4 0 0 0 4-4a4 4 0 0 0-4-4a4 4 0 0 0-4 4a4 4 0 0 0 4 4"/></svg>
                        </IconButton>
                    </div>
                    <Typography as="p" className={`${isDarkColor(schoolClassWithAverages.color) ? "text-white" : "text-black"} text-xl font-semibold`}>Voilà les élèves de {schoolClassWithAverages.name} !</Typography>
                    <div className="bg-white rounded-xl p-3 w-[90%] mt-3">
                        {schoolClassWithAverages.pupils !== undefined && schoolClassWithAverages.pupils.length > 0 ? (
                            <Card className="h-full w-full overflow-x-auto">
                                <table className="w-full min-w-[36rem] table-fixed text-left">
                                    <colgroup>
                                        <col className="w-[32%]" />
                                        <col span={4} className="w-[17%]" />
                                    </colgroup>
                                    <thead>
                                        <tr className="bg-test-100/10">
                                            {["Nom", "Moy. T1", "Moy. T2", "Moy. T3", "Moy. année"].map((heading) => (
                                                <th
                                                    key={heading}
                                                    className="p-2 text-center"
                                                >
                                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                                        {heading}
                                                    </Typography>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schoolClassWithAverages.pupils.map(({ lastName, firstName, id, results }, index) => {
                                            const isLast = index === schoolClassWithAverages.pupils.length - 1;
                                            const cellClasses = `p-2 text-center ${isLast ? "" : "border-b border-blue-gray-50"}`;

                                            return (
                                                <tr key={id} className="even:bg-test-200 bg-opacity-60">
                                                    <td className={`${cellClasses}`}>
                                                        <Link to={`/student/${id}`}>
                                                            <Typography variant="small" color="blue-gray" className="font-normal md:hidden">
                                                                {lastName.length > 12 ? `${lastName.slice(0, 12)}...` : lastName} {firstName}
                                                            </Typography>
                                                            <Typography variant="small" color="blue-gray" className="hidden font-normal md:inline">
                                                                {lastName} {firstName}
                                                            </Typography>
                                                        </Link>
                                                    </td>
                                                    {Object.values(results).map((average) => (
                                                        <td key={average} className={cellClasses}>
                                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                                {average ? average.toFixed(2) : "X"}
                                                            </Typography>
                                                        </td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </Card>
                            ) : (
                            <p className="text-center">
                                Aucun élève
                            </p>
                        )}
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
