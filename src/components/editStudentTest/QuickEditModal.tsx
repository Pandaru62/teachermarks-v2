import TestInterface from "../../interfaces/test.interface";
import StudentTestInterface, { SkillLevelEnum } from "../../interfaces/student-test.interface";
import { DialogBody, IconButton, Chip, DialogFooter, Button } from "@material-tailwind/react";
import CheckBoxListItem from "../ui/formInput/checkboxListItem";
import SkillBubbleButton from "../ui/skill/skillBubbleButton";
import { useEffect } from "react";
import StudentInterface from "../../interfaces/student.interface";
import useStudentTestEditor from "../../hooks/studentTest/useStudentTestEditor";

interface QuickEditModalProps {
    handleOpen: () => void;
    test: TestInterface;
    studentTests: StudentTestInterface[];
    students: StudentInterface[];
    startingStudentId: number;
}

export default function QuickEditModal(props: QuickEditModalProps) {

    const { handleOpen, test, studentTests, students, startingStudentId } = props;

    const {
        formik,
        student,
        isSaved,
        setIsSaved,
        handleSkillChange,
        confirmAndNavigate,
        currentStudentId
    } = useStudentTestEditor({ test, studentTests, students, startingStudentId });

    useEffect(() => {
        if (formik.dirty) setIsSaved(false);
    }, [formik.dirty]);


    const handleNext = () => {
        const currentIndex = students.findIndex(s => s.id === currentStudentId);
        const nextStudent = students[(currentIndex + 1) % students.length];
        confirmAndNavigate(nextStudent.id);
    };

    const handlePrevious = () => {
        const currentIndex = students.findIndex(s => s.id === currentStudentId);
        const prevStudent = students[(currentIndex - 1 + students.length) % students.length];
        confirmAndNavigate(prevStudent.id);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogBody className="text-black">
                <div className="mb-3 flex justify-between text-center">
                    <IconButton variant="outlined" className="rounded-full" onClick={handlePrevious}>
                        ←
                    </IconButton>
                    <div className="flex flex-col">
                        <span>Évaluation : {test.name} ({test?.schoolclass?.name})</span>
                        <span>Élève : <span className="font-semibold">{student?.lastName} {student?.firstName}</span></span>
                    </div>
                    <IconButton variant="outlined" className="rounded-full" onClick={handleNext}>
                        →
                    </IconButton>
                </div>
                <ul>
                    <li className="flex gap-3 items-center mb-3">
                        <Chip value="Note" color="cyan" className="w-20 text-center" variant="outlined" />
                        <label htmlFor="mark" className="hidden">Note</label>
                        <input
                            id="mark"
                            name="mark"
                            type="number"
                            step="0.25"
                            max={test.scale}
                            min={0}
                            className="w-10 text-right pe-1 border-gray-500 border-2 disabled:bg-gray-300 disabled:text-gray-300"
                            onChange={formik.handleChange}
                            onFocus={(e) => e.target.select()}
                            value={formik.values.mark}
                            disabled={formik.values.isUnmarked || formik.values.isAbsent}
                        />
                        <span>/{test.scale}</span>
                        <CheckBoxListItem
                            id="isUnmarked"
                            label="NN"
                            checked={formik.values.isUnmarked}
                            onClick={() => {
                                formik.setFieldValue("isUnmarked", !formik.values.isUnmarked);
                                formik.setFieldValue("mark", 0);
                            }}
                        />
                        <CheckBoxListItem
                            id="isAbsent"
                            label="ABS"
                            checked={formik.values.isAbsent}
                            onClick={() => {
                                formik.setFieldValue("isAbsent", !formik.values.isAbsent);
                                formik.setFieldValue("mark", 0);
                            }}
                        />
                    </li>
                    {formik.values.skills.sort((a, b) => a.skillId - b.skillId).map(skill => (
                        <li key={skill.skillId} className="flex flex-col lg:flex-row gap-3 items-center mb-3">
                            <Chip value={test.skills.find(sk => skill.skillId === sk.id)?.name} color="cyan" className="w-40 text-center" variant="outlined" />
                            <div className="flex col-span-2 gap-2">
                                {Object.values(SkillLevelEnum).map(level => (
                                    <SkillBubbleButton
                                        key={level}
                                        level={level}
                                        label={level !== SkillLevelEnum.ABS && level !== SkillLevelEnum.NN ? level[3] : level}
                                        isActive={level === skill.level}
                                        onClick={() => handleSkillChange(skill.skillId, level)}
                                    />
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
                    Fermer sans enregistrer
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    type="submit"
                    className="flex items-center gap-2"
                    disabled={!formik.dirty || !formik.isValid || isSaved}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-2 .85L16.15 5H5v14h14zM12 18q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-6-8h9V6H6zM5 7.85V19V5z"></path></svg>
                    {isSaved || !formik.dirty ? "Données à jour" : "Enregistrer"}
                </Button>
            </DialogFooter>
        </form>
    );
}
