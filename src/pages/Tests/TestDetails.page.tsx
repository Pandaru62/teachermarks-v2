import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, Dialog } from "@material-tailwind/react";

import Wrapper from "../../components/ui/wrapper";
import QuickEditModal from "../../components/editStudentTest/QuickEditModal";
import TestSummaryCard from "../../components/testDetails/TestSummaryCard";
import ResultsTableToolbar from "../../components/testDetails/ResultsTableToolbar";
import ResultsTable from "../../components/testDetails/ResultsTable";

import useTestQuery from "../../hooks/test/useTestQuery";
import useStudentTestsByTestIdQuery from "../../hooks/studentTest/useStudentTestsByTestIdQuery";
import useStudentsByClassQuery from "../../hooks/student/useStudentsByClassQuery";
import useTestResultsEditor from "../../hooks/studentTest/useTestResultsEditor";


export default function TestDetailsPage() {

    const navigate = useNavigate();
    const testId = Number(useParams().id);

    const { test, testError, testLoading } = useTestQuery(testId);

    const {
        studentTests,
        studentTestsError,
        studentTestsLoading,
        numAbsent,
        numUnmarked,
        numMarked,
        average
    } = useStudentTestsByTestIdQuery(testId);

    const { students } = useStudentsByClassQuery(
        test?.schoolClassId ?? 0
    );


    /*
    |--------------------------------------------------------------------------
    | Student test lookup
    |--------------------------------------------------------------------------
    */

    const studentTestByStudentId = useMemo(() => {

        if (!studentTests) {
            return new Map();
        }

        return new Map(
            studentTests.map(studentTest => [
                studentTest.student.id,
                studentTest
            ])
        );

    }, [studentTests]);


    /*
    |--------------------------------------------------------------------------
    | Edit mode (note / statut / compétences / commentaire)
    |--------------------------------------------------------------------------
    */

    const {
        isEditMode,
        isSaving,
        editedStudentTests,
        firstInputRef,
        handleEditMode,
        handleCancelEdit,
        handleSaveEdit,
        handleMarkChange,
        handleStatusChange,
        handleSkillChange,
        handleCommentChange,
    } = useTestResultsEditor({
        test: test!,
        testId,
        students: students ?? [],
        studentTestByStudentId,
    });


    /*
    |--------------------------------------------------------------------------
    | Quick edit modal
    |--------------------------------------------------------------------------
    */

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<number>(0);

    const handleOpen = () => setModalIsOpen(prev => !prev);

    const handleTestEdit = (studentId: number) => {
        setSelectedStudentId(studentId);
        setModalIsOpen(true);
    };


    /*
    |--------------------------------------------------------------------------
    | Loading / errors
    |--------------------------------------------------------------------------
    */

    if (testLoading || studentTestsLoading) {
        return <p>Chargement en cours</p>;
    }

    if (testError || studentTestsError) {
        return <p>Une erreur est survenue</p>;
    }


    return (
        <>
            {test && studentTests && students && (

                <>

                    <TestSummaryCard
                        test={test}
                        studentTests={studentTests}
                        numAbsent={numAbsent}
                        numUnmarked={numUnmarked}
                        numMarked={numMarked}
                        average={average}
                        onEditTest={() => navigate(`/tests/${testId}/edit`)}
                        onGoHome={() => navigate("/")}
                    />

                    <Card className="
                        mt-3
                        p-3
                        w-full
                        text-black
                        overflow-hidden
                    ">

                        <ResultsTableToolbar
                            studentsCount={students.length}
                            isEditMode={isEditMode}
                            isSaving={isSaving}
                            onEdit={handleEditMode}
                            onEditMobile={() => {
                                setSelectedStudentId(students[0].id);
                                handleOpen();
                            }}
                            onCancel={handleCancelEdit}
                            onSave={handleSaveEdit}
                        />

                        <ResultsTable
                            test={test}
                            students={students}
                            studentTestByStudentId={studentTestByStudentId}
                            isEditMode={isEditMode}
                            editedStudentTests={editedStudentTests}
                            firstInputRef={firstInputRef}
                            onMarkChange={handleMarkChange}
                            onStatusChange={handleStatusChange}
                            onSkillChange={handleSkillChange}
                            onCommentChange={handleCommentChange}
                            onQuickEdit={handleTestEdit}
                        />

                    </Card>


                    {/* ================================================== */}
                    {/* QUICK EDIT MODAL                                  */}
                    {/* ================================================== */}

                    <Dialog
                        open={modalIsOpen}
                        size="xl"
                        handler={handleOpen}
                    >

                        {selectedStudentId ? (

                            <QuickEditModal
                                handleOpen={handleOpen}
                                test={test}
                                studentTests={studentTests}
                                startingStudentId={selectedStudentId}
                                students={students}
                            />

                        ) : (

                            <div>Erreur</div>

                        )}

                    </Dialog>

                </>

            )}
        </>
    );
}
