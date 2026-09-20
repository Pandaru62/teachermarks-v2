import { useEffect, useRef, useState } from "react";

import TestInterface from "../../interfaces/test.interface";
import StudentInterface from "../../interfaces/student.interface";
import StudentTestInterface, { SkillLevelEnum } from "../../interfaces/student-test.interface";
import {
    EditableStudentTest,
    toBatchStudentTestPayload,
} from "../../interfaces/editable-student-test.interface";
import { inputValueToSkillLevel, SKILL_INPUT_VALUES } from "../../utils/skillLevel.util";
import { batchEditStudentTests } from "../../api/studenttest";
import { useQueryClient } from "@tanstack/react-query";


interface UseTestResultsEditorParams {
    test: TestInterface;
    testId: number;
    students: StudentInterface[];
    studentTestByStudentId: Map<number, StudentTestInterface>;
}


/*
|--------------------------------------------------------------------------
| Hook regroupant tout l'état et les handlers du mode édition du
| tableau de résultats : entrée/sortie du mode, diff avant sauvegarde,
| et mise à jour de la note / du statut / des compétences / du
| commentaire pour chaque élève.
|--------------------------------------------------------------------------
*/

export default function useTestResultsEditor({
    test,
    testId,
    students,
    studentTestByStudentId,
}: UseTestResultsEditorParams) {

    const queryClient = useQueryClient();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [editedStudentTests, setEditedStudentTests] =
        useState<Record<number, EditableStudentTest>>({});

    // Photo de l'état "au moment où on est entré en mode édition".
    // Sert uniquement à calculer un diff au moment d'enregistrer,
    // donc une ref suffit (pas besoin de re-render quand elle change).
    const initialStudentTestsRef =
        useRef<Record<number, EditableStudentTest>>({});

    const firstInputRef = useRef<HTMLInputElement>(null);


    /*
    |--------------------------------------------------------------------------
    | Enter edit mode
    |--------------------------------------------------------------------------
    */

    const handleEditMode = () => {

        const initialValues: Record<number, EditableStudentTest> = {};

        students.forEach(student => {

            const studentTest =
                studentTestByStudentId.get(student.id);

            initialValues[student.id] = {
                mark: studentTest?.mark ?? null,
                isAbsent: studentTest?.isAbsent ?? false,
                isUnmarked: studentTest?.isUnmarked ?? true,
                comment: studentTest?.comment ?? "",
                skills: Object.fromEntries(
                    test.skills.map(skill => [
                        skill.id,
                        studentTest?.studenttesthasskill.find(
                            sts => sts.skill.id === skill.id
                        )?.level ?? SkillLevelEnum.NN
                    ])
                )
            };

        });

        setEditedStudentTests(initialValues);

        // On garde une copie "avant modification" pour pouvoir calculer
        // le diff au moment de l'enregistrement.
        initialStudentTestsRef.current = initialValues;

        setIsEditMode(true);

    };


    /*
    |--------------------------------------------------------------------------
    | Automatically focus first input when entering edit mode
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (isEditMode) {
            requestAnimationFrame(() => {
                firstInputRef.current?.focus();
                firstInputRef.current?.select();
            });

        }

    }, [isEditMode]);


    /*
    |--------------------------------------------------------------------------
    | Cancel edit
    |--------------------------------------------------------------------------
    */

    const handleCancelEdit = () => {

        setEditedStudentTests({});
        initialStudentTestsRef.current = {};
        setIsEditMode(false);

    };


    /*
    |--------------------------------------------------------------------------
    | Diff : un élève a-t-il réellement été modifié ?
    |--------------------------------------------------------------------------
    */

    const hasStudentTestChanged = (
        studentId: number,
        edited: EditableStudentTest
    ): boolean => {

        const initialValue = initialStudentTestsRef.current[studentId];

        if (!initialValue) {
            return false;
        }

        const skillIds = new Set([
            ...Object.keys(edited.skills),
            ...Object.keys(initialValue.skills),
        ]);

        const skillsChanged = Array.from(skillIds).some(skillIdKey => {
            const skillId = Number(skillIdKey);
            return edited.skills[skillId] !== initialValue.skills[skillId];
        });

        return (
            edited.mark !== initialValue.mark ||
            edited.isAbsent !== initialValue.isAbsent ||
            edited.isUnmarked !== initialValue.isUnmarked ||
            edited.comment !== initialValue.comment ||
            skillsChanged
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Save edit
    |--------------------------------------------------------------------------
    */

    const handleSaveEdit = async () => {

        // On ne garde que les élèves réellement modifiés : les autres
        // ne déclenchent aucun appel réseau.
        const changedEntries = Object.entries(editedStudentTests).filter(
            ([studentIdKey, edited]) =>
                hasStudentTestChanged(Number(studentIdKey), edited)
        );

        if (changedEntries.length === 0) {
            setEditedStudentTests({});
            initialStudentTestsRef.current = {};
            setIsEditMode(false);
            return;
        }

        setIsSaving(true);

        try {

            // Un seul appel batch pour tous les élèves modifiés,
            // plutôt qu'un PUT par élève.
            const studentTests = changedEntries.map(
                ([studentIdKey, edited]) =>
                    toBatchStudentTestPayload(Number(studentIdKey), edited)
            );

            const editedStudentTests = await batchEditStudentTests(testId, studentTests);

            if(editedStudentTests) {

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

                editedStudentTests.map((test:any) => {
                    updateStudentTestsCache(
                        test
                    );
                })
            }

            setEditedStudentTests({});
            initialStudentTestsRef.current = {};
            setIsEditMode(false);

        } catch (error) {

            console.error("Erreur lors de l'enregistrement", error);

        } finally {

            setIsSaving(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Update mark
    |--------------------------------------------------------------------------
    */

    const handleMarkChange = (
        studentId: number,
        value: string
    ) => {

        const numericValue = Number(value);

        if (Number.isNaN(numericValue)) {
            return;
        }

        if (
            numericValue < 0 ||
            numericValue > test.scale
        ) {
            return;
        }

        setEditedStudentTests(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                mark: numericValue,
                isAbsent: false,
                isUnmarked: false,
            }
        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Set absent / unmarked
    |--------------------------------------------------------------------------
    */

    const handleStatusChange = (
        studentId: number,
        status: "absent" | "unmarked"
    ) => {

        setEditedStudentTests(prev => {

            const current = prev[studentId];

            if (!current) {
                return prev;
            }

            if (status === "absent") {

                return {
                    ...prev,
                    [studentId]: {
                        ...current,
                        mark: null,
                        isAbsent: !current.isAbsent,
                        isUnmarked: false,
                    }
                };

            }

            return {
                ...prev,
                [studentId]: {
                    ...current,
                    mark: null,
                    isAbsent: false,
                    isUnmarked: !current.isUnmarked,
                }
            };

        });

    };


    /*
    |--------------------------------------------------------------------------
    | Skill input
    |--------------------------------------------------------------------------
    */

    const handleSkillChange = (
        studentId: number,
        skillId: number,
        value: string
    ) => {

        const normalizedValue = value.toUpperCase();

        if (
            normalizedValue !== "" &&
            !SKILL_INPUT_VALUES.includes(normalizedValue)
        ) {
            return;
        }

        const skillValue =
            inputValueToSkillLevel(normalizedValue);

        setEditedStudentTests(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                skills: {
                    ...prev[studentId].skills,
                    [skillId]: skillValue
                }
            }
        }));

    };


    /*
    |--------------------------------------------------------------------------
    | Comment input
    |--------------------------------------------------------------------------
    */

    const handleCommentChange = (
        studentId: number,
        value: string
    ) => {

        setEditedStudentTests(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                comment: value,
            }
        }));

    };


    return {
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
    };

}