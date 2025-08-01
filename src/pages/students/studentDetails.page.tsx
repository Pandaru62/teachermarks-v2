import { Link, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../../components/ui/wrapper";
import useStudentQuery from "../../hooks/student/useStudentQuery";
import { Card, IconButton, Typography, Button, Chip, List, Dialog } from "@material-tailwind/react";
import BackButton from "../../components/ui/backButton";
import useStudentTestsByStudentIdQuery from "../../hooks/studentTest/useStudentTestsByStudentIdQuery";
import { getAverageSkillById } from "../../utils/calculations/average.function";
import SkillBubble from "../../components/ui/skill/skillBubble";
import { useEffect, useState } from "react";
import { SkillLevelEnum, StudentTestByStudentInterface } from "../../interfaces/student-test.interface";
import CheckBoxListItem from "../../components/ui/formInput/checkboxListItem";
import { TrimesterEnum } from "../../interfaces/test.interface";
import DiagramModal from "../../components/ui/DiagramModal";
import { PDFDownloadLink } from '@react-pdf/renderer';
import StudentReportPdf from "../../components/studentReport/studentReportPdf";

export default function StudentDetailsPage() {

    const navigate = useNavigate();
    const studentId = Number(useParams().id);
    const {student, studentError,studentLoading} = useStudentQuery(studentId);
    const [trimesterFilters, setTrimesterFilters] = useState<TrimesterEnum[]>([TrimesterEnum.TR1, TrimesterEnum.TR2, TrimesterEnum.TR3])
    const {studentTests, studentTestsError, studentTestsLoading, average, uniqueSkills, averageSkills} = useStudentTestsByStudentIdQuery(studentId);
    const [filteredTests, setFilteredTests] = useState<StudentTestByStudentInterface[]>(studentTests ?? []);
    const [diagramModal, setDiagramModal] = useState<boolean>(false);

    const handleDiagramModal = () => {
        setDiagramModal(!diagramModal);
    }

    const handleTrimesterFilters = (trimester : TrimesterEnum) => {
        if (trimesterFilters.includes(trimester)) {
            setTrimesterFilters(trimesterFilters.filter((trimesterFilter) => trimesterFilter !== trimester))
        } else {
            setTrimesterFilters([...trimesterFilters, trimester])
        }
    }

    useEffect(() => {
            if (!studentTests) return;
    
            let filtered = [...studentTests];
    
                filtered = filtered.filter(st =>
                trimesterFilters.includes(st.test.trimester)
                );
            
            setFilteredTests(filtered);
        }, [trimesterFilters, studentTests]);

    return (
       <Wrapper>
            {(studentLoading || studentTestsLoading) && (<div>Chargement en cours.</div>)}
            {(studentError || studentTestsError) && (<div>Une erreur s'est produite.</div>)}
            {student && studentTests && (
            <>
                <Card className={`mt-6 py-5 bg-test-200 text-black flex p-5`}>
                    <div className="flex justify-between">
                        <BackButton/>
                        <h1 className="text-black text-center">{student.lastName} {student.firstName}</h1>
                        <IconButton color="white" className={`rounded-xl`} onClick={() => navigate(`/student/${studentId}/edit`)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="#F46030" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></g></svg>
                        </IconButton>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:gap-3">
                        <div className="mt-5 bg-white rounded-xl p-3 flex-row items-center justify-between w-full">
                            <Typography as="h3" className="font-logo text-center">Moyenne annuelle</Typography>
                            {studentTests.length > 0 ? (
                            <div className="flex justify-between items-center">
                                <div className="flex flex-col justify-center">
                                    <div>
                                        <span className="font-semibold">Note</span> : {average} / 20
                                    </div>
                                    <ul>
                                        {uniqueSkills.map((sk) => (
                                            <li key={sk.id} className="flex gap-2 items-center">
                                                <SkillBubble 
                                                    letter={sk.abbr}
                                                    level={getAverageSkillById(studentTests, sk.id).level}
                                                />
                                                <span className="font-semibold">{sk.name}</span> : {isNaN(sk.avg) ? "Non évalué" : sk.avg + "/4"}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <IconButton onClick={handleDiagramModal}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M14 20.5V4.25c0-.728-.002-1.2-.048-1.546c-.044-.325-.115-.427-.172-.484s-.159-.128-.484-.172C12.949 2.002 12.478 2 11.75 2s-1.2.002-1.546.048c-.325.044-.427.115-.484.172s-.128.159-.172.484c-.046.347-.048.818-.048 1.546V20.5z" clipRule="evenodd"/><path fill="currentColor" d="M8 8.75A.75.75 0 0 0 7.25 8h-3a.75.75 0 0 0-.75.75V20.5H8zm12 5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v6.75H20z" opacity="0.7"/><path fill="currentColor" d="M1.75 20.5a.75.75 0 0 0 0 1.5h20a.75.75 0 0 0 0-1.5z" opacity="0.5"/></svg>
                                    </IconButton>
                                    <PDFDownloadLink 
                                        document={<StudentReportPdf
                                            tests={filteredTests} student={student} uniqueSkills={uniqueSkills} average={average}
                                        />} 
                                    fileName={`${student.lastName}_${student.firstName}.pdf`}
                                    >
                                        <IconButton>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M13.586 2a2 2 0 0 1 1.284.467l.13.119L19.414 7a2 2 0 0 1 .578 1.238l.008.176V20a2 2 0 0 1-1.85 1.995L18 22H6a2 2 0 0 1-1.995-1.85L4 20V4a2 2 0 0 1 1.85-1.995L6 2zM12 4H6v16h12V10h-4.5a1.5 1.5 0 0 1-1.493-1.356L12 8.5zm.988 7.848a6.22 6.22 0 0 0 2.235 3.872c.887.717.076 2.121-.988 1.712a6.22 6.22 0 0 0-4.47 0c-1.065.41-1.876-.995-.989-1.712a6.22 6.22 0 0 0 2.235-3.872c.178-1.127 1.8-1.126 1.977 0m-.99 2.304l-.688 1.196h1.38zM14 4.414V8h3.586z"></path></g></svg>
                                        </IconButton>
                                    </PDFDownloadLink>
                                    <IconButton disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32"><path fill="currentColor" d="M10 18h8v2h-8zm0-5h12v2H10zm0 10h5v2h-5z"></path><path fill="currentColor" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"></path></svg>
                                    </IconButton>
                                    <IconButton disabled>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"></path></svg>
                                    </IconButton>
                                </div>
                            </div>
                            ):(
                            <div className="flex flex-col p-3">
                                <span className="text-center">Cet élève n'a pas encore été évalué.</span>
                                <Button 
                                    onClick={() => navigate(`/tests/new`)}
                                    className="bg-test-300 text-black"
                                >Ajoutez une évaluation</Button>
                            </div>
                            )}
                        </div>
                        <div className="mt-5 bg-white rounded-xl p-3 flex-col">
                            <Typography as="h3" className="font-logo text-center">Filtrer</Typography>
                            {/* <fieldset className="border-2 border-dashed m-3 rounded-xl"> */}
                                {/* <legend className="ms-3">Filtrer par trimestre</legend> */}
                                <List className="flex-col md:flex-row">
                                { Object.values(TrimesterEnum).map(trimester =>
                                    (<CheckBoxListItem 
                                        key={trimester}
                                        onClick={() => handleTrimesterFilters(trimester)}
                                        checked={trimesterFilters.includes(trimester)}
                                        id={trimester}
                                        label={trimester}
                                    />))}
                                </List>
                            {/* </fieldset> */}
                        </div>
                    </div>
                </Card>
                <Card className="mt-3 p-3 h-full w-full overflow-scroll text-black">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead className="hidden">
                            <tr>
                                <th rowSpan={2}>Evaluation</th>
                                <th rowSpan={2}>Note</th>
                                <th colSpan={uniqueSkills.length}>Compétences évaluées</th>
                            </tr>
                            <tr>
                                {uniqueSkills.map(skill => (
                                    <th key={skill.id}>{skill.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="py-3">
                            {filteredTests.map(studentTest => (
                                <tr key={studentTest.id} className="hover:bg-test-200 hover:bg-opacity-30">
                                    <td className="ps-2 ">
                                        <Chip value={studentTest.test.trimester} size="sm" className="inline me-2" />
                                        <Link to={`/tests/${studentTest.test.id}`}>
                                            {studentTest.test.name.length > 5 ? (studentTest.test.name).split("", 5) : studentTest.test.name}
                                        </Link>
                                    </td>
                                    <td>
                                        <span className="font-semibold">{studentTest.mark ?? 'x'}</span>
                                        <span className="text-xs">/{studentTest.test.scale}</span>
                                    </td>
                                    {uniqueSkills.map(skill => (
                                    <td key={skill.id}>
                                        <SkillBubble 
                                            bubbleSize={9}
                                            textSize="lg"
                                            letter={studentTest.studenttesthasskill.find((sths => sths.skill.id === skill.id))?.skill.abbreviation ?? "X"}
                                            level={studentTest.studenttesthasskill.find((sths => sths.skill.id === skill.id))?.level ?? SkillLevelEnum.NN}
                                        />
                                    </td>
                                ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
                <Dialog open={diagramModal} handler={handleDiagramModal}>
                    <DiagramModal 
                        handleOpen={handleDiagramModal}
                        student={student}
                        averageSkills={averageSkills}
                    />
                </Dialog>
            </>
            )}
       </Wrapper>
    )


}