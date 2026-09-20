import { RefObject } from "react";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { ChatBubbleLeftIcon, PencilSquareIcon } from "@heroicons/react/24/solid";

import TestInterface from "../../interfaces/test.interface";
import StudentInterface from "../../interfaces/student.interface";
import StudentTestInterface, { SkillLevelEnum } from "../../interfaces/student-test.interface";
import { EditableStudentTest } from "../../interfaces/editable-student-test.interface";
import SkillBubble from "../ui/skill/skillBubble";
import {
    handleSkillKeyDown,
    skillLevelToInputValue,
} from "../../utils/skillLevel.util";


interface ResultsTableRowProps {
    student: StudentInterface;
    studentIndex: number;
    isLastStudent: boolean;
    test: TestInterface;
    studentTest?: StudentTestInterface;
    edited?: EditableStudentTest;
    isEditMode: boolean;
    firstInputRef: RefObject<HTMLInputElement>;
    onMarkChange: (studentId: number, value: string) => void;
    onStatusChange: (studentId: number, status: "absent" | "unmarked") => void;
    onSkillChange: (studentId: number, skillId: number, value: string) => void;
    onCommentChange: (studentId: number, value: string) => void;
    onQuickEdit: (studentId: number) => void;
}


/*
|--------------------------------------------------------------------------
| Un élève = un <tbody> contenant sa ligne de résultats et, en mode
| édition, une seconde ligne pour le commentaire. Les deux lignes
| partagent le même groupe de survol (group/row).
|--------------------------------------------------------------------------
*/

export default function ResultsTableRow({
    student,
    studentIndex,
    isLastStudent,
    test,
    studentTest,
    edited,
    isEditMode,
    firstInputRef,
    onMarkChange,
    onStatusChange,
    onSkillChange,
    onCommentChange,
    onQuickEdit,
}: ResultsTableRowProps) {

    // Colonnes présentes en mode édition, hors la colonne "Élève" :
    // Note + compétences. Sert de colSpan pour la ligne "Commentaire".
    const remainingColumnsInEditMode = test.skills.length + 1;

    return (

        <tbody className="group/row">

            <tr className={`
                transition-colors
                group-hover/row:bg-gray-50
                ${
                    !isEditMode && !isLastStudent
                        ? "border-b border-gray-100"
                        : ""
                }
            `}>

                {/* ====================================== */}
                {/* STUDENT                                */}
                {/* ====================================== */}

                <td className="
                    py-3
                    ps-2
                ">

                    <Link
                        to={`/student/${student.id}`}
                        className="
                            font-medium
                            text-gray-900
                            hover:text-test-300
                            hover:underline
                            transition-colors
                        "
                    >

                        <span className="
                            hidden
                            md:inline
                        ">
                            {student.lastName.toUpperCase()}{" "}
                            {student.firstName}
                        </span>


                        <span className="
                            md:hidden
                        ">
                            {student.lastName
                                .slice(0, 12)
                                .toUpperCase()}{" "}
                            {student.firstName[0]}.
                        </span>

                    </Link>

                </td>

                {/* ====================================== */}
                {/* MARK                                   */}
                {/* ====================================== */}

                <td className="
                    py-3
                    text-center
                ">

                    {isEditMode ? (

                        <div className="
                            flex
                            flex-col
                            items-center
                            gap-1
                        ">

                            <div className="
                                flex
                                items-center
                                justify-center
                                gap-1
                            ">

                                <input
                                    ref={
                                        studentIndex === 0
                                            ? firstInputRef
                                            : undefined
                                    }
                                    type="number"
                                    min={0}
                                    max={
                                        test.scale
                                    }
                                    step="0.01"
                                    value={edited?.mark ?? ""}
                                    onChange={event =>
                                        onMarkChange(
                                            student.id,
                                            event.target.value
                                        )
                                    }
                                    disabled={
                                        edited?.isAbsent ||
                                        edited?.isUnmarked
                                    }
                                    className="
                                        w-16
                                        h-10
                                        rounded-lg
                                        border
                                        border-gray-300
                                        bg-white
                                        px-2
                                        text-center
                                        font-semibold
                                        outline-none
                                        transition-all
                                        focus:border-test-300
                                        focus:ring-2
                                        focus:ring-test-300/30
                                        disabled:bg-gray-100
                                        disabled:text-gray-400
                                    "
                                />


                                <span className="
                                    text-xs
                                ">
                                    /{test.scale}
                                </span>

                            </div>


                            {/* ABS / NN ne font pas partie de la navigation TAB */}

                            <div className="
                                flex
                                gap-1
                            ">

                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() =>
                                        onStatusChange(
                                            student.id,
                                            "absent"
                                        )
                                    }
                                    className={`
                                        rounded-md
                                        px-1.5
                                        py-0.5
                                        text-[10px]
                                        font-semibold
                                        transition-colors
                                        ${
                                            edited?.isAbsent
                                                ? "bg-gray-700 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }
                                    `}
                                >
                                    ABS
                                </button>


                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() =>
                                        onStatusChange(
                                            student.id,
                                            "unmarked"
                                        )
                                    }
                                    className={`
                                        rounded-md
                                        px-1.5
                                        py-0.5
                                        text-[10px]
                                        font-semibold
                                        transition-colors
                                        ${
                                            edited?.isUnmarked
                                                ? "bg-gray-700 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }
                                    `}
                                >
                                    NN
                                </button>

                            </div>

                        </div>

                    ) : (

                        <>

                            {studentTest?.isAbsent ? (

                                <span className="
                                    inline-flex
                                    rounded-md
                                    bg-gray-100
                                    px-2
                                    py-1
                                    text-sm
                                    font-semibold
                                ">
                                    ABS
                                </span>

                            ) : studentTest?.isUnmarked ? (

                                <span className="
                                    inline-flex
                                    rounded-md
                                    bg-gray-100
                                    px-2
                                    py-1
                                    text-sm
                                    font-semibold
                                ">
                                    NN
                                </span>

                            ) : (

                                <div className="flex items-center justify-center gap-2">
                                    <div>
                                        <span className="
                                            font-semibold
                                        ">
                                            {studentTest?.mark ?? "x"}
                                        </span>

                                        <span className="
                                            text-xs
                                        ">
                                            /{test.scale}
                                        </span>
                                    </div>

                                    {/* COMMENT */}

                                    {studentTest?.comment && (

                                    <Tooltip content={studentTest.comment}>

                                        <ChatBubbleLeftIcon color="orange" className="
                                            w-5
                                            h-5
                                            
                                        " />

                                    </Tooltip>

                                    )}

                                </div>

                            )}

                        </>

                    )}

                </td>


                {/* ====================================== */}
                {/* SKILLS                                 */}
                {/* ====================================== */}

                {test.skills.map(skill => {

                    const skillResult =
                        studentTest
                            ?.studenttesthasskill
                            .find(
                                studentSkill =>
                                    studentSkill.skill.id ===
                                    skill.id
                            );


                    const currentLevel =
                        edited?.skills[
                            skill.id
                        ] ??
                        skillResult?.level ??
                        SkillLevelEnum.NN;

                    const isStudentDisabled = edited?.isAbsent || edited?.isUnmarked;


                    return (

                        <td
                            key={skill.id}
                            className="
                                py-3
                                px-2
                                text-center
                            "
                        >

                            {isEditMode ? (
                            <div className="flex flex-col gap-1 justify-center items-center">

                                <input
                                    type="text"
                                    maxLength={1}
                                    value={
                                        isStudentDisabled || currentLevel === 'NN'
                                            ? "—"
                                            : skillLevelToInputValue(currentLevel)
                                    }
                                    disabled={isStudentDisabled}
                                    onKeyDown={
                                        handleSkillKeyDown
                                    }
                                    onChange={event =>
                                        onSkillChange(
                                            student.id,
                                            skill.id,
                                            event.target.value
                                        )
                                    }
                                    aria-label={`
                                        ${student.firstName}
                                        ${student.lastName}
                                        -
                                        ${skill.name}
                                    `}
                                    className={`
                                        w-10
                                        h-10
                                        rounded-lg
                                        border
                                        text-center
                                        font-bold
                                        text-base
                                        uppercase
                                        outline-none
                                        transition-all

                                        ${
                                        isStudentDisabled
                                            ? `
                                                border-gray-200
                                                bg-gray-100
                                                text-gray-300
                                                cursor-not-allowed
                                            `
                                            : `
                                                border-gray-300
                                                bg-white
                                                text-gray-900
                                                uppercase
                                                hover:border-gray-400
                                                focus:border-test-300
                                                focus:ring-2
                                                focus:ring-test-300/30*
                                            `
                                        }
                                    `}
                                />
                                 <div className="
                                flex
                                gap-1
                            ">

                                <button
                                    type="button"
                                    tabIndex={-1}
                                    onClick={() =>
                                        onSkillChange(
                                            student.id,
                                            skill.id,
                                            ""
                                        )
                                    }
                                    className={`
                                        rounded-md
                                        px-1.5
                                        py-0.5
                                        text-[10px]
                                        font-semibold
                                        transition-colors
                                        ${
                                            isStudentDisabled || currentLevel === SkillLevelEnum.NN
                                                ? "bg-gray-700 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }
                                    `}
                                >
                                    NN
                                </button>
                                </div>

                            </div>

                            ) : (

                                <div className="
                                    flex
                                    justify-center
                                ">

                                    <SkillBubble
                                        bubbleSize={9}
                                        textSize="lg"
                                        letter={
                                            skill.abbreviation ??
                                            "X"
                                        }
                                        level={
                                            skillResult?.level ??
                                            SkillLevelEnum.NN
                                        }
                                    />

                                </div>

                            )}

                        </td>

                    );

                })}


                {/* ====================================== */}
                {/* ACTIONS                                */}
                {/* ====================================== */}

                {!isEditMode && (

                    <td className="
                        py-3
                        px-2
                    ">

                        <div className="
                            flex
                            items-center
                            justify-center
                            gap-1
                        ">

                            {/* QUICK EDIT */}

                            <Tooltip content="Édition rapide">
                                <IconButton
                                    variant="text"
                                    size="sm"
                                    className="rounded-full"
                                    onClick={() => onQuickEdit(student.id)}
                                >
                                    <PencilSquareIcon className="h-5 w-5 text-gray-700" />
                                </IconButton>
                            </Tooltip>

                        </div>

                    </td>

                )}

            </tr>


            {/* ====================================== */}
            {/* COMMENT ROW (édition uniquement)       */}
            {/* ====================================== */}

            {isEditMode && (

                <tr className={`
                    transition-colors
                    group-hover/row:bg-gray-50
                    ${
                        !isLastStudent
                            ? "border-b border-gray-100"
                            : ""
                    }
                `}>

                    <td
                        colSpan={remainingColumnsInEditMode +1}
                        className="
                            pb-3
                            pt-0
                            px-2
                        "
                    >
                        <span className="
                            text-xs
                            text-gray-500
                        ">
                            Appréciation de {student.firstName} {student.lastName}
                        </span>
                        <textarea
                            rows={2}
                            value={edited?.comment ?? ""}
                            onChange={event =>
                                onCommentChange(
                                    student.id,
                                    event.target.value
                                )
                            }
                            placeholder="Appréciation..."
                            className="
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                bg-white
                                px-2
                                py-1
                                text-sm
                                outline-none
                                transition-all
                                focus:border-test-300
                                focus:ring-2
                                focus:ring-test-300/30
                            "
                        />
                    </td>

                </tr>

            )}

        </tbody>

    );

}
