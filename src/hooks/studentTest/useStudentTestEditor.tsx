import StudentTestInterface, {
    SkillLevelEnum
} from "../../interfaces/student-test.interface";
import { useFormik } from "formik";
import { editStudentTest } from "../../api/studenttest";
import { useState } from "react";
import TestInterface from "../../interfaces/test.interface";
import StudentInterface from "../../interfaces/student.interface";
import { useQueryClient } from "@tanstack/react-query";

interface UseStudentTestEditorProps {
    test: TestInterface;
    studentTests: StudentTestInterface[];
    students: StudentInterface[];
    startingStudentId: number;
}

export default function useStudentTestEditor({
    test,
    studentTests,
    students,
    startingStudentId
}: UseStudentTestEditorProps) {

    const queryClient = useQueryClient();

    const [currentStudentId, setCurrentStudentId] =
        useState<number>(startingStudentId);

    const [isSaving, setIsSaving] = useState<boolean>(false);

    const student = students.find(
        s => s.id === currentStudentId
    );

    let studentTest = studentTests.find(
        st => st.student.id === currentStudentId
    );

    /*
     * If no StudentTest exists yet, create a local default value.
     * An absent StudentTest means that the student has not been graded yet.
     */
    if (!studentTest && student && test?.skills) {
        studentTest = {
            id: 0,
            isAbsent: false,
            isUnmarked: false,
            mark: null,
            student,
            studenttesthasskill: test.skills.map(skill => ({
                level: SkillLevelEnum.NN,
                skill,
            })),
            comment: ""
        };
    }

    const initialValues = {
        mark: studentTest?.mark ?? 0,

        isUnmarked:
            studentTest?.isUnmarked ?? true,

        isAbsent:
            studentTest?.isAbsent ?? false,

        skills:
            test.skills.map(skill => ({
                skillId: skill.id,
                level:
                    studentTest?.studenttesthasskill.find(
                        studentSkill =>
                            studentSkill.skill.id === skill.id
                    )?.level ?? SkillLevelEnum.NN
            })) ?? [],

        comment:
            studentTest?.comment ?? ""
    };

    const updateStudentTestsCache = (
        editedStudentTest: StudentTestInterface
    ) => {
        queryClient.setQueryData(
            ["studentTests", test.id],
            (
                oldTests:
                    | StudentTestInterface[]
                    | undefined
            ) => {

                if (!oldTests) {
                    return [editedStudentTest];
                }

                const index = oldTests.findIndex(
                    currentTest =>
                        currentTest.id === editedStudentTest.id
                );

                if (index !== -1) {
                    const updated = [...oldTests];

                    updated[index] = editedStudentTest;

                    return updated;
                }

                return [
                    ...oldTests,
                    editedStudentTest
                ];
            }
        );
    };

    const formik = useFormik({
        enableReinitialize: true,

        initialValues,

        onSubmit: async () => {
            await saveCurrentStudent();
        },
    });

    const saveCurrentStudent = async (): Promise<boolean> => {

        if (!formik.dirty) {
            return true;
        }

        try {
            setIsSaving(true);

            const editedStudentTest =
                await editStudentTest(
                    test.id,
                    currentStudentId,
                    formik.values
                );

            if (!editedStudentTest) {
                return false;
            }

            updateStudentTestsCache(
                editedStudentTest
            );

            /*
             * The current form now represents the
             * saved state.
             */
            formik.resetForm({
                values: formik.values
            });

            return true;

        } catch (error) {
            console.error(
                "Erreur lors de l'enregistrement de l'évaluation",
                error
            );

            return false;

        } finally {
            setIsSaving(false);
        }
    };

    const handleSkillChange = (
        skillId: number,
        level: SkillLevelEnum
    ) => {

        const currentSkills =
            formik.values.skills;

        const newSkills =
            currentSkills.filter(
                skill =>
                    skill.skillId !== skillId
            );

        formik.setFieldValue(
            "skills",
            [
                ...newSkills,
                {
                    skillId,
                    level
                }
            ]
        );
    };

    /**
     * Save the current student before navigating
     * to another student.
     */
    const navigateToStudent = async (
        nextStudentId: number
    ) => {

        const saved = await saveCurrentStudent();

        if (!saved) {
            return false;
        }

        setCurrentStudentId(
            nextStudentId
        );

        return true;
    };

    /**
     * Reset the current form to the last saved state.
     * The modal remains open.
     */
    const cancelCurrentChanges = () => {
        formik.resetForm();
    };

    return {
        formik,
        student,
        studentTest,
        currentStudentId,
        isSaving,
        handleSkillChange,
        saveCurrentStudent,
        navigateToStudent,
        cancelCurrentChanges
    };
}