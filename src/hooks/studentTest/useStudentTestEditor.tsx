import StudentTestInterface, { SkillLevelEnum } from "../../interfaces/student-test.interface";
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

export default function useStudentTestEditor({ test, studentTests, students, startingStudentId } : UseStudentTestEditorProps) {

    const queryClient = useQueryClient();

    
    const [currentStudentId, setCurrentStudentId] = useState<number>(startingStudentId);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const student = students.find(s => s.id === currentStudentId);

    let studentTest = studentTests.find(st => st.student.id === currentStudentId);

    if (!studentTest && student && test?.skills) {
        studentTest = {
            id: 0,
            isAbsent: false,
            isUnmarked: false,
            mark: 0,
            student,
            studenttesthasskill: test.skills.map(skill => ({
                level: SkillLevelEnum.NN,
                skill,
            })),
        };
    }

    const initialValues = {
            mark: studentTest?.mark ?? 0,
            isUnmarked: studentTest?.isUnmarked ?? false,
            isAbsent: studentTest?.isAbsent ?? false,
            skills: test.skills.map(sk => ({
                skillId: sk.id,
                level: studentTest?.studenttesthasskill.find(s => s.skill.id === sk.id)?.level ?? SkillLevelEnum.NN,
            })) ?? [],
        };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: async (values) => {
            const editedStudentTest = await editStudentTest(test.id, currentStudentId, values);
            if (editedStudentTest) {
                queryClient.setQueryData(['studentTests', test.id], (oldTests: StudentTestInterface[] | undefined) => {
                    if (!oldTests) return [editedStudentTest];
                    const index = oldTests.findIndex(t => t.id === editedStudentTest.id);
                    if (index !== -1) {
                        const updated = [...oldTests];
                        updated[index] = editedStudentTest;
                        return updated;
                    }
                    return [...oldTests, editedStudentTest];
                });

                formik.resetForm({ values });
                setIsSaved(true);
            }
        },
    });

    
    
    const handleSkillChange = (skillId: number, level: SkillLevelEnum) => {
        const currentSkills = formik.values.skills;
        const newSkills = currentSkills.filter(sk => sk.skillId !== skillId);
        formik.setFieldValue("skills", [...newSkills, { skillId, level }]);
    };

    const confirmAndNavigate = (nextId: number) => {
        if (formik.dirty && !isSaved) {
            const confirmed = window.confirm("Des modifications non enregistrées seront perdues. Continuer ?");
            if (!confirmed) return;
        }
        setCurrentStudentId(nextId);
        setIsSaved(false);
    };



    return ({
        formik,
        studentTest,
        isSaved,
        setIsSaved,
        handleSkillChange,
        student,
        confirmAndNavigate,
        currentStudentId
    });

}
