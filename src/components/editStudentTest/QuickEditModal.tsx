import TestInterface from "../../interfaces/test.interface";
import StudentTestInterface, {
    SkillLevelEnum
} from "../../interfaces/student-test.interface";

import {
    DialogBody,
    IconButton,
    DialogFooter,
    Button,
    Textarea
} from "@material-tailwind/react";

import CheckBoxListItem from "../ui/formInput/checkboxListItem";
import { useEffect, useRef } from "react";
import StudentInterface from "../../interfaces/student.interface";

import useStudentTestEditor from "../../hooks/studentTest/useStudentTestEditor";
import SkillBubble from "../ui/skill/skillBubble";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface QuickEditModalProps {
    handleOpen: () => void;
    test: TestInterface;
    studentTests: StudentTestInterface[];
    students: StudentInterface[];
    startingStudentId: number;
}

const skillLevelToInputValue = (
    level: SkillLevelEnum
): string => {

    switch (level) {
        case SkillLevelEnum.LVL0:
            return "0";

        case SkillLevelEnum.LVL1:
            return "1";

        case SkillLevelEnum.LVL2:
            return "2";

        case SkillLevelEnum.LVL3:
            return "3";

        case SkillLevelEnum.LVL4:
            return "4";

        default:
            return "";
    }
};

const inputValueToSkillLevel = (
    value: string
): SkillLevelEnum => {

    switch (value) {
        case "0":
            return SkillLevelEnum.LVL0;

        case "1":
            return SkillLevelEnum.LVL1;

        case "2":
            return SkillLevelEnum.LVL2;

        case "3":
            return SkillLevelEnum.LVL3;

        case "4":
            return SkillLevelEnum.LVL4;

        default:
            return SkillLevelEnum.NN;
    }
};



export default function QuickEditModal({
    handleOpen,
    test,
    studentTests,
    students,
    startingStudentId
}: QuickEditModalProps) {

    const {
        formik,
        student,
        currentStudentId,
        isSaving,
        handleSkillChange,
        navigateToStudent,
        cancelCurrentChanges,
        saveCurrentStudent
    } = useStudentTestEditor({
        test,
        studentTests,
        students,
        startingStudentId
    });

    const markRef =
        useRef<HTMLInputElement | null>(null);

    /*
     * Focus the mark when changing student.
     */
    useEffect(() => {

        const element =
            markRef.current;

        if (!element) {
            return;
        }

        const timeout =
            setTimeout(() => {
                element.focus();
                element.select();
            }, 50);

        return () =>
            clearTimeout(timeout);

    }, [currentStudentId]);

    const sortedSkills =
        [...formik.values.skills].sort(
            (a, b) =>
                a.skillId - b.skillId
        );

    /*
     * Find the current skill definition
     * from the test.
     */
    const getSkill = (skillId: number) =>
        test.skills.find(
            skill => skill.id === skillId
        );

    /*
     * Close the modal.
     *
     * Unlike navigation, closing does NOT save automatically.
     * We warn if there are unsaved changes.
     */
    const handleClose = () => {

        if (formik.dirty) {

            const confirmed =
                globalThis.confirm(
                    "Des modifications non enregistrées seront perdues. Voulez-vous vraiment fermer ?"
                );

            if (!confirmed) {
                return;
            }
        }

        handleOpen();
    };

    /*
     * Cancel current changes but keep
     * the modal open.
     */
    const handleCancel = () => {
        cancelCurrentChanges();
    };

    /*
     * Previous student.
     * Changes are saved automatically.
     */
    const handlePrevious = async () => {

        const currentIndex =
            students.findIndex(
                s =>
                    s.id === currentStudentId
            );

        if (currentIndex === -1) {
            return;
        }

        const previousStudent =
            students[
                (currentIndex - 1 + students.length) %
                students.length
            ];

        await navigateToStudent(
            previousStudent.id
        );
    };

    /*
     * Next student.
     * Changes are saved automatically.
     */
    const handleNext = async () => {

        const currentIndex =
            students.findIndex(
                s =>
                    s.id === currentStudentId
            );

        if (currentIndex === -1) {
            return;
        }

        const nextStudent =
            students[
                (currentIndex + 1) %
                students.length
            ];

        await navigateToStudent(
            nextStudent.id
        );
    };

    /*
     * Save and close.
     */
    const handleSaveAndClose = async () => {

        const saved =
            await saveCurrentStudent();

        if (saved) {
            handleOpen();
        }
    };

    /*
     * Status handling.
     */

    const handleUnmarkedChange = () => {

        const newValue =
            !formik.values.isUnmarked;

        formik.setFieldValue(
            "isUnmarked",
            newValue
        );

        if (newValue) {

            formik.setFieldValue(
                "isAbsent",
                false
            );

            formik.setFieldValue(
                "mark",
                0
            );

            formik.setFieldValue(
                "skills",
                sortedSkills.map(
                    skill => ({
                        skillId: skill.skillId,
                        level: SkillLevelEnum.NN
                    })
                )
            );
        }
    };

    const handleAbsentChange = () => {

        const newValue =
            !formik.values.isAbsent;

        formik.setFieldValue(
            "isAbsent",
            newValue
        );

        if (newValue) {

            formik.setFieldValue(
                "isUnmarked",
                false
            );

            formik.setFieldValue(
                "mark",
                0
            );

            formik.setFieldValue(
                "skills",
                sortedSkills.map(
                    skill => ({
                        skillId: skill.skillId,
                        level: SkillLevelEnum.ABS
                    })
                )
            );
        }
    };

    const isStudentDisabled =
        formik.values.isUnmarked ||
        formik.values.isAbsent;

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const touchStartX = useRef<number | null>(null);

    const handleTouchStart = (event: React.TouchEvent) => {
        touchStartX.current = event.touches[0].clientX;
    };

    const handleTouchEnd = async (event: React.TouchEvent) => {
        if (touchStartX.current === null) {
            return;
        }

        const touchEndX = event.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX.current;

        touchStartX.current = null;

        // Ignore les petits mouvements
        if (Math.abs(deltaX) < 50) {
            return;
        }

        if (deltaX < 0) {
            // Swipe gauche → suivant
            await handleNext();
        } else {
            // Swipe droite → précédent
            await handlePrevious();
        }
    };


    return (
        <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col"
        >

            {/* HEADER */}

            <div
                className="
                    sticky
                    top-0
                    z-30
                    bg-white
                    border-b
                    border-gray-200
                    px-3
                    pt-2
                    pb-3
                "
            >
                {/* CLOSE */}
                <div className="flex  justify-end">

                    <IconButton
                        variant="text"
                        size="sm"
                        className="rounded-full"
                        onClick={handleClose}
                        disabled={isSaving}
                        aria-label="Fermer"
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-700" />
                    </IconButton>

                </div>


                <div
                    className="
                        flex
                        items-center
                        gap-1
                    "
                >

                    {/* PREVIOUS */}

                    <IconButton
                        variant="text"
                        size="sm"
                        className="rounded-full"
                        onClick={handlePrevious}
                        disabled={isSaving}
                        aria-label="Élève précédent"
                    >
                        <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
                    </IconButton>

                    {/* STUDENT */}

                    <div
                        className="
                            min-w-0
                            flex-1
                            text-center
                        "
                    >

                        <div
                            className="
                                truncate
                                text-base
                                font-bold
                                text-gray-900
                            "
                        >
                            {student?.lastName}{" "}
                            {student?.firstName}
                        </div>

                        <div
                            className="
                                truncate
                                text-xs
                                text-gray-500
                            "
                        >
                            {test.name}
                            {" · "}
                            {test?.schoolclass?.name}
                        </div>

                    </div>

                    {/* NEXT */}

                    <IconButton
                        variant="text"
                        size="sm"
                        className="rounded-full"
                        onClick={handleNext}
                        disabled={isSaving}
                        aria-label="Élève suivant"
                    >
                        <ChevronRightIcon className="h-5 w-5 text-gray-700" />
                    </IconButton>

                </div>

            </div>


            {/* CONTENT */}

            <DialogBody
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="
                    overflow-auto
                    max-h-[calc(100vh-190px)]
                    px-3
                    py-4
                    text-black
                "
            >

                {/* STATUS */}

                <section className="mb-5">

                    <div
                        className="
                            mb-2
                            text-sm
                            font-semibold
                            text-gray-700
                        "
                    >
                        Note
                    </div>

                    <div
                        className="
                            grid
                            grid-cols-3
                        "
                    >

                        <CheckBoxListItem
                            id="isUnmarked"
                            label="NN"
                            checked={
                                formik.values.isUnmarked
                            }
                            onClick={
                                handleUnmarkedChange
                            }
                        />

                        <CheckBoxListItem
                            id="isAbsent"
                            label="ABS"
                            checked={
                                formik.values.isAbsent
                            }
                            onClick={
                                handleAbsentChange
                            }
                        />

                        <div className="flex items-center gap-1">
                            <input
                                id="mark"
                                name="mark"
                                type="number"
                                inputMode="decimal"
                                step="0.01"
                                min={0}
                                max={test.scale}
                                ref={markRef}
                                value={
                                    isStudentDisabled
                                        ? ""
                                        : formik.values.mark
                                }
                                disabled={
                                    isStudentDisabled
                                }
                                onChange={
                                    formik.handleChange
                                }
                                onFocus={event =>
                                    event.target.select()
                                }
                                className="
                                    h-11
                                    w-16
                                    rounded-lg
                                    border
                                    border-gray-300
                                    bg-white
                                    px-2
                                    text-center
                                    text-lg
                                    font-semibold
                                    outline-none
                                    focus:border-cyan-500
                                    focus:ring-2
                                    focus:ring-cyan-500/20
                                    disabled:cursor-not-allowed
                                    disabled:bg-gray-100
                                    disabled:text-gray-400
                                    "
                                    />

                            <span
                                className="
                                text-sm
                                text-gray-500
                                "
                            >
                                / {test.scale}
                            </span>
                        </div>

                    </div>

                </section>


                {/* SKILLS */}

                <section className="mb-6">

                    <div
                        className="
                            mb-3
                            text-sm
                            font-semibold
                            text-gray-700
                        "
                    >
                        Compétences
                    </div>

                    <div
                        className="
                            flex
                            flex-col
                            gap-2
                        "
                    >

                        {sortedSkills.map(
                            (skillValue, index) => {

                                const skill =
                                    getSkill(
                                        skillValue.skillId
                                    );

                                if (!skill) {
                                    return null;
                                }

                                const inputValue =
                                    skillLevelToInputValue(
                                        skillValue.level
                                    );

                                const handleSkillNN = (skillId: number) => {
                                    handleSkillChange(skillId, SkillLevelEnum.NN);
                                };


                                return (
                                    <div
                                        key={
                                            skillValue.skillId
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            min-h-12
                                            rounded-lg
                                            border
                                            border-gray-100
                                            px-3
                                            py-2
                                        "
                                    >

                                        {/* SKILL COLOR / LABEL */}

                                        <div
                                            className="
                                                flex
                                                min-w-0
                                                flex-1
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <SkillBubble
                                                bubbleSize={9}
                                                textSize="lg"
                                                letter={
                                                    skill.abbreviation ??
                                                    "X"
                                                }
                                                level={formik.values.isAbsent ? SkillLevelEnum.ABS :
                                                    inputValueToSkillLevel(inputValue)
                                                }
                                            />
                                            <span
                                                className="
                                                    truncate
                                                    text-sm
                                                    font-medium
                                                    text-gray-800
                                                "
                                            >
                                                {skill.name}
                                            </span> 

                                        </div>

                                        {/* NN Button */}

                                        <button
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => handleSkillNN(skillValue.skillId)}
                                            className={`
                                                rounded-md
                                                px-1.5
                                                py-0.5
                                                text-[10px]
                                                font-semibold
                                                transition-colors
                                                ${
                                                    skillValue.level === 'NN'
                                                        ? "bg-gray-700 text-white"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }
                                            `}
                                        >
                                            NN
                                        </button>


                                        {/* LEVEL INPUT */}

                                        <input
                                            key={skillValue.skillId}
                                            ref={element => {inputRefs.current[index] = element}}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={
                                                isStudentDisabled
                                                    ? ""
                                                    : inputValue
                                            }
                                            disabled={
                                                isStudentDisabled
                                            }
                                            aria-label={`
                                                ${skill.name}
                                                pour
                                                ${student?.firstName}
                                                ${student?.lastName}
                                            `}
                                            onChange={event => {
                                                const value = event.target.value;

                                                if (!["0", "1", "2", "3", "4"].includes(value)) {
                                                    return;
                                                }

                                                handleSkillChange(
                                                    skillValue.skillId,
                                                    inputValueToSkillLevel(value)
                                                );

                                                inputRefs.current[index + 1]?.focus();
                                            }}
                                            onKeyDown={event => {

                                                if (
                                                    [
                                                        "Tab",
                                                        "Backspace",
                                                        "Delete",
                                                        "ArrowLeft",
                                                        "ArrowRight"
                                                    ].includes(
                                                        event.key
                                                    )
                                                ) {
                                                    return;
                                                }

                                                if (
                                                    ![
                                                        "0",
                                                        "1",
                                                        "2",
                                                        "3",
                                                        "4"
                                                    ].includes(
                                                        event.key
                                                    )
                                                ) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            className={`
                                                h-10
                                                w-11
                                                shrink-0
                                                rounded-lg
                                                border
                                                text-center
                                                text-lg
                                                font-bold
                                                outline-none
                                                transition
                                                ${
                                                    isStudentDisabled
                                                        ? `
                                                            cursor-not-allowed
                                                            border-gray-200
                                                            bg-gray-100
                                                            text-gray-300
                                                        `
                                                        : `
                                                            border-gray-300
                                                            bg-white
                                                            text-gray-900
                                                            focus:border-cyan-500
                                                            focus:ring-2
                                                            focus:ring-cyan-500/20
                                                        `
                                                }
                                            `}
                                        />

                                    </div>
                                );
                            }
                        )}

                    </div>

                </section>


                {/* COMMENT */}

                <section>

                    <div
                        className="
                            mb-2
                            text-sm
                            font-semibold
                            text-gray-700
                        "
                    >
                        Commentaire
                    </div>

                    <Textarea
                        name="comment"
                        label="Appréciation ou remarques"
                        value={
                            formik.values.comment
                        }
                        onChange={
                            formik.handleChange
                        }
                        rows={3}
                    />

                </section>

            </DialogBody>


            {/* FOOTER */}

            <DialogFooter
                className="
                    sticky
                    bottom-0
                    z-30
                    grid
                    grid-cols-2
                    gap-2
                    border-t
                    border-gray-200
                    bg-white/95
                    px-3
                    py-3
                    backdrop-blur-sm
                    md:flex
                    md:justify-end
                "
            >

                {/* CANCEL CHANGES */}

                <Button
                    type="button"
                    variant="text"
                    color="red"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="order-1"
                >
                    Annuler
                </Button>

                {/* SAVE + CLOSE */}

                <Button
                    type="button"
                    variant="gradient"
                    color="green"
                    onClick={
                        handleSaveAndClose
                    }
                    disabled={
                        !formik.dirty ||
                        isSaving
                    }
                    className="
                        order-2
                        flex
                        items-center
                        justify-center
                        gap-2
                    "
                >
                    {isSaving
                        ? "Enregistrement..."
                        : "Enregistrer & quitter"}
                </Button>

            </DialogFooter>

        </form>
    );
}