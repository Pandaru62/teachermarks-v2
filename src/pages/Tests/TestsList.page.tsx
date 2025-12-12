import { Link, useNavigate } from "react-router-dom";
import useAllTestsQuery from "../../hooks/test/useAllTestsQuery"
import { Card, CardBody, Chip, Typography } from "@material-tailwind/react";
import BackButton from "../../components/ui/backButton";
import TestFilterSection from "../../components/ui/TestFilterSection";
import TestInterface, { TrimesterEnum } from "../../interfaces/test.interface";
import { useEffect, useState } from "react";
import { CalendarIcon } from "@heroicons/react/24/solid";
import DefaultIconButton from "../../components/ui/defaultIconButton";

export default function TestsListPage() {

    const {allTests, allTestsError, allTestsLoading} = useAllTestsQuery();
    const [trimesterFilters, setTrimesterFilters] = useState<TrimesterEnum[]>([TrimesterEnum.TR1, TrimesterEnum.TR2, TrimesterEnum.TR3])
    const [schoolClassFilters, setSchoolClassFilters] = useState<string[]>([])
    const [filteredTests, setFilteredTests] = useState<TestInterface[]>(allTests ?? [])
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!allTests) return;

        let filtered = [...allTests];

        if (trimesterFilters.length > 0) {
            filtered = filtered.filter(test =>
            trimesterFilters.includes(test.trimester)
            );
        }

        if (schoolClassFilters.length > 0) {
            filtered = filtered.filter(test =>
            schoolClassFilters.includes(test.schoolclass?.name ?? "")
            );
        }

        setFilteredTests(filtered);
    }, [trimesterFilters, schoolClassFilters, allTests]);
    
    if (allTestsLoading) return <p>Chargement en cours ...</p>
    if (allTestsError) return <p>Erreur. Veuillez réessayer</p>

    return(
        <Card 
            className="mt-6 py-5 bg-test-200 text-black flex justify-between items-center"
        >
            <div className="w-full flex justify-between p-3">
                <BackButton/>
                <h2 className="text-black mb-3 text-center">Mes évaluations</h2>
                <DefaultIconButton onClick={() => {navigate("/tests/new")}} type="add"/>
            </div>
            <div className="flex flex-col gap-5 w-[96%]">
                <TestFilterSection
                    schoolClassFilters={schoolClassFilters}
                    setSchoolClassFilters={setSchoolClassFilters}
                    setTrimesterFilters={setTrimesterFilters}
                    trimesterFilters={trimesterFilters}
                />
                <div className="flex justify-center items-center text-center bg-white bg-opacity-60 rounded-xl">
                    {filteredTests.length > 0 ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="green" d="M16.972 6.251a2 2 0 0 0-2.72.777l-3.713 6.682l-2.125-2.125a2 2 0 1 0-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 0 0 1.471-1.009l5-9a2 2 0 0 0-.776-2.72"></path></svg>
                            <span>
                                {filteredTests.length === 1 ? "1 évaluation correspond à vos critères." : filteredTests.length + " évaluations correspondent à vos critères."}
                            </span>
                        </>
                    ): (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20"><path fill="red" d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15l-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152l2.758 3.15a1.2 1.2 0 0 1 0 1.698"></path></svg>                            <span>
                                Aucune évaluation n'a été trouvée.
                            </span>
                        </>
                    )}
                </div>
            </div>
        
            {filteredTests && (
            <ul className="mt-3 w-[96%]">
                {filteredTests.map((test) => (
                    <li key={test.id} className="mb-3">
                        <Link to={`/tests/${test.id}`}>
                            <Card>
                                <CardBody>
                                    <div className="flex gap-3">
                                        <Chip className="min-w-10" value={test.schoolclass?.name ?? "classe non définie"} style={{ backgroundColor: test.schoolclass?.color ?? 'white'}}/>
                                        <Chip value={test.trimester} />
                                        <Chip 
                                        value={ new Date(test.date).toLocaleDateString()}
                                        icon={<CalendarIcon/>}
                                        className="w-min"/>
                                    </div>
                                    <Typography as="h3" className="text-black text-lg mt-2 font-semibold">
                                        {test.name}
                                    </Typography>
                                </CardBody>
                            </Card>
                        </Link>
                    </li>
                ))}
            </ul>
            )}
        </Card>

    )
}
