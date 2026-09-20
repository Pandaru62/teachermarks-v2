import { RefObject } from "react";

import TestInterface from "../../interfaces/test.interface";
import StudentInterface from "../../interfaces/student.interface";
import StudentTestInterface from "../../interfaces/student-test.interface";
import { EditableStudentTest } from "../../interfaces/editable-student-test.interface";
import ResultsTableRow from "./ResultsTableRow";


interface ResultsTableProps {
    test: TestInterface;
    students: StudentInterface[];
    studentTestByStudentId: Map<number, StudentTestInterface>;
    isEditMode: boolean;
    editedStudentTests: Record<number, EditableStudentTest>;
    firstInputRef: RefObject<HTMLInputElement>;
    onMarkChange: (studentId: number, value: string) => void;
    onStatusChange: (studentId: number, status: "absent" | "unmarked") => void;
    onSkillChange: (studentId: number, skillId: number, value: string) => void;
    onCommentChange: (studentId: number, value: string) => void;
    onQuickEdit: (studentId: number) => void;
}


export default function ResultsTable({
    test,
    students,
    studentTestByStudentId,
    isEditMode,
    editedStudentTests,
    firstInputRef,
    onMarkChange,
    onStatusChange,
    onSkillChange,
    onCommentChange,
    onQuickEdit,
}: ResultsTableProps) {

    return (

        <div className="
            w-full
            overflow-x-auto
        ">

            <table className="
                w-full
                min-w-max
                table-auto
                text-left
                border-collapse
            ">

                <thead>

                    <tr className="
                        border-b
                        border-gray-200
                        text-gray-600
                        text-sm
                    ">

                        <th className="
                            py-3
                            ps-2
                            font-semibold
                        ">
                            Élève
                        </th>

                        <th className="
                            py-3
                            text-center
                            font-semibold
                        ">
                            Note
                        </th>


                        {test.skills.map(skill => (

                            <th
                                key={skill.id}
                                className="
                                    py-3
                                    px-2
                                    text-center
                                    font-semibold
                                "
                            >
                                {skill.name}
                            </th>

                        ))}


                        {!isEditMode && (

                            <th className="
                                py-3
                                px-2
                                text-center
                                font-semibold
                            ">
                                Actions
                            </th>

                        )}

                    </tr>

                </thead>


                {students.map((student, studentIndex) => (

                    <ResultsTableRow
                        key={student.id}
                        student={student}
                        studentIndex={studentIndex}
                        isLastStudent={studentIndex === students.length - 1}
                        test={test}
                        studentTest={studentTestByStudentId.get(student.id)}
                        edited={editedStudentTests[student.id]}
                        isEditMode={isEditMode}
                        firstInputRef={firstInputRef}
                        onMarkChange={onMarkChange}
                        onStatusChange={onStatusChange}
                        onSkillChange={onSkillChange}
                        onCommentChange={onCommentChange}
                        onQuickEdit={onQuickEdit}
                    />

                ))}

            </table>

        </div>

    );

}
