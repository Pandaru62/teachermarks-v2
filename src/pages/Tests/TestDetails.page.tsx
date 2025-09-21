import { Link, useNavigate, useParams } from "react-router-dom";
import useTestQuery from "../../hooks/test/useTestQuery"
import { Button, Card, Chip, Dialog, IconButton, Typography } from "@material-tailwind/react";
import Wrapper from "../../components/ui/wrapper";
import useStudentTestsByTestIdQuery from "../../hooks/studentTest/useStudentTestsByTestIdQuery";
import BackButton from "../../components/ui/backButton";
import useStudentsByClassQuery from "../../hooks/student/useStudentsByClassQuery";
import SkillBubble from "../../components/ui/skill/skillBubble";
import { SkillLevelEnum } from "../../interfaces/student-test.interface";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { getAverageSkillById } from "../../utils/calculations/average.function";
import SkillAverageLine from "../../components/ui/skill/skillAverageLine";
import { useState } from "react";
import QuickEditModal from "../../components/editStudentTest/QuickEditModal";

export default function TestDetailsPage() {

    const navigate = useNavigate();
    const testId = Number(useParams().id);
    const {test, testError, testLoading} = useTestQuery(testId)
    const {
        studentTests, 
        studentTestsError, 
        studentTestsLoading,
        numAbsent,
        numUnmarked,
        numMarked,
        average
    } = useStudentTestsByTestIdQuery(testId)
    const {students} = useStudentsByClassQuery(test?.schoolClassId ?? 0)

    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [selectedStudentId, setSelectedStudentId] = useState<number>(0)
    const handleOpen = () => setModalIsOpen(!modalIsOpen);
    
    const handleTestEdit = (currentStudentId: number) => {
        setSelectedStudentId(currentStudentId);
        handleOpen()
    }

    if (testLoading || studentTestsLoading) return <p>Chargement en cours</p>
    if (testError || studentTestsError) return <p>Une erreur est survenue</p>

    return(
        <>
        {test && studentTests && students && (
        <Wrapper>
            <Card className={`mt-6 py-5 bg-test-200 text-black flex p-5`}>
                <div className="flex justify-between">
                    <BackButton/>
                    <h1 className="text-black text-center">Mon évaluation</h1>
                    <IconButton color="white" className={`rounded-xl`} onClick={() => navigate(`/tests/${testId}/edit`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="#F46030" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></g></svg>
                    </IconButton>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-3 justify-center">
                        <Typography as="h2" className="text-xl font-semibold text-center">
                            {test.name}
                        </Typography>
                        <Chip value={test.schoolclass?.name} className="w-min"/>
                    </div>

                    {test.description && (
                        <div className="bg-white bg-opacity-60 rounded-xl p-2 mb-1">
                            <Typography as="p">{test.description}</Typography>
                        </div>
                    )}
                    <div className="flex gap-3 justify-center">
                        <Chip value={"Trimestre " + test.trimester[2]} className="w-min"/>
                        <Chip 
                            value={ new Date(test.date).toLocaleDateString()}
                            icon={<CalendarIcon/>}
                            className="w-min"/>
                        <Chip value={"coeff. " + test.coefficient} className="w-min"/>
                    </div>
                </div>
                    <div className="flex flex-col lg:flex-row lg:gap-3 lg:justify-stretch w-full">
                        <div className="mt-5 bg-white rounded-xl p-3 flex-row items-center justify-between w-full">
                            <Typography as="h3" className="font-logo text-center">Résumé</Typography>
                            {numUnmarked !== test.schoolclass?.count ? (
                            <div className="flex justify-between items-center">
                                <ul>
                                    <li>{numMarked} / {test.schoolclass?.count} élèves évalués</li>
                                    <li>ABS : {numAbsent} | Non évalué : {test.schoolclass?.count ? test.schoolclass.count - numMarked - numAbsent : '?'}</li>
                                    <li><span className="font-semibold">Moyenne</span> : {average.toFixed(2)} / {test.scale}</li>
                                </ul>
                                <IconButton disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M14 20.5V4.25c0-.728-.002-1.2-.048-1.546c-.044-.325-.115-.427-.172-.484s-.159-.128-.484-.172C12.949 2.002 12.478 2 11.75 2s-1.2.002-1.546.048c-.325.044-.427.115-.484.172s-.128.159-.172.484c-.046.347-.048.818-.048 1.546V20.5z" clipRule="evenodd"/><path fill="currentColor" d="M8 8.75A.75.75 0 0 0 7.25 8h-3a.75.75 0 0 0-.75.75V20.5H8zm12 5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v6.75H20z" opacity="0.7"/><path fill="currentColor" d="M1.75 20.5a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5z" opacity="0.5"/></svg>
                                </IconButton>
                            </div>
                            ):(
                            <div className="flex flex-col p-3">
                                <span className="text-center">Aucun élève n'a encore été évalué.</span>
                                <Button 
                                    onClick={() => navigate(`/`)}
                                    className="bg-test-300 text-black"
                                    disabled
                                >Saisissez les résultats</Button>
                            </div>
                            )}
                        </div>
                        <div className="mt-5 bg-white rounded-xl p-3 w-full">
                            <Typography as="h3" className="font-logo text-center">Compétences évaluées</Typography>
                            {test.skills.length > 0 ? (
                                <div className="flex justify-between items-center">
                                    <ul>
                                    {test.skills.map(skill => (
                                        <SkillAverageLine key={skill.id} calcAvg={getAverageSkillById(studentTests, skill.id)} skill={skill} />
                                    ))}
                                    </ul>
                                </div>
                            ) : 
                                <div className="flex flex-col p-3">
                                    <span className="text-center">Aucune compétence évaluée.</span>
                                    <Button 
                                        onClick={() => navigate(`/tests/${testId}/edit`)}
                                        className="bg-test-300 text-black"
                                    >
                                        Ajoutez des compétences à évaluer
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
            </Card>

            <Card className="mt-3 p-3 h-full w-full overflow-scroll text-black">
                <table className="w-full min-w-max table-auto text-left">
                    <thead className="hidden">
                        <tr>
                            <th rowSpan={2}>Elève</th>
                            <th rowSpan={2}>Note</th>
                            <th colSpan={test.skills.length}>Compétences évaluées</th>
                        </tr>
                        <tr>
                            {test.skills.map(skill => (
                                <th key={skill.id}>{skill.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="py-3">
                        {students.map(student => (
                            <tr key={student.id} className="hover:bg-test-200 hover:bg-opacity-30 cursor-pointer" onClick={() => handleTestEdit(student.id)}>
                                <td className="ps-2">
                                    <Link to={`/student/${student.id}`}>
                                        <span className="hidden md:inline">{student.lastName.toUpperCase()} {student.firstName}</span>
                                        <span className="md:hidden">{student.lastName.slice(0,12).toUpperCase()}  {student.firstName[0]}.</span>
                                    </Link>
                                </td>
                                <td>
                                    <span className="font-semibold">{studentTests.find((st) => st.student.id === student.id)?.mark ?? 'x'}</span><span className="text-xs">/{test.scale}</span>
                                </td>
                                {test.skills.map(skill => (
                                <td key={skill.id} className="pe-2">
                                    <SkillBubble 
                                        bubbleSize={9}
                                        textSize="lg"
                                        letter={skill?.abbreviation ?? "X"}
                                        level={studentTests.find((st) => st.student.id === student.id)?.studenttesthasskill.find((st) => st.skill.id === skill.id)?.level ?? SkillLevelEnum.NN}
                                    />
                                </td>
                                ))}      
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <Dialog
                open={modalIsOpen}
                size="md"
                handler={handleOpen}
            >
                {selectedStudentId ? (
                    <QuickEditModal handleOpen={handleOpen} test={test} studentTests={studentTests} startingStudentId={selectedStudentId} students={students} />
                ): (<div>Erreur</div>)}
            </Dialog>
        </Wrapper>
        )}
        </>
    )
}