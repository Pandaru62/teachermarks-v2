import { Button, Card, Chip, IconButton, Typography } from "@material-tailwind/react";
import { CalendarIcon, PencilIcon } from "@heroicons/react/24/solid";

import BackButton from "../ui/backButton";
import HorizontalTestChart from "../ui/horizontalTestChart";
import { RadialSkillIndicator } from "../ui/radialSkillIndicator";
import TestTagChip from "../ui/TestTagChip";

import TestInterface from "../../interfaces/test.interface";
import StudentTestInterface from "../../interfaces/student-test.interface";
import { getAverageSkillById } from "../../utils/calculations/average.function";


interface TestSummaryCardProps {
    test: TestInterface;
    studentTests: StudentTestInterface[];
    numAbsent: number;
    numUnmarked: number;
    numMarked: number;
    average: number;
    onEditTest: () => void;
    onGoHome: () => void;
}


/*
|--------------------------------------------------------------------------
| Carte d'en-tête du test : infos générales (nom, classe, date...),
| répartition des résultats, et vue d'ensemble des compétences.
| N'a rien à voir avec le mode édition du tableau.
|--------------------------------------------------------------------------
*/

export default function TestSummaryCard({
    test,
    studentTests,
    numAbsent,
    numUnmarked,
    numMarked,
    average,
    onEditTest,
    onGoHome,
}: TestSummaryCardProps) {

    return (

        <Card className="
            mt-6
            py-5
            bg-test-200
            text-black
            flex
            p-5
        ">

            <div className="
                flex
                justify-between
                items-center
            ">

                <BackButton />

                <IconButton
                    color="white"
                    className="rounded-xl"
                    onClick={onEditTest}
                >
                    <PencilIcon className="
                        w-5
                        h-5
                        text-test-400
                    " />
                </IconButton>

            </div>


            <div className="gap-3">

                {/* ========================================== */}
                {/* TEST INFORMATION                           */}
                {/* ========================================== */}

                <div className="
                    mt-5
                    bg-white
                    rounded-xl
                    p-3
                    flex-row
                    items-center
                    justify-between
                    w-full
                ">

                    <Typography
                        as="h2"
                        className="
                            font-logo
                            text-center
                            border-0
                            border-black
                            border-b-2
                            mb-2
                        "
                    >
                        {test.name}
                    </Typography>


                    <div className="
                        flex
                        gap-2
                        mb-2
                        flex-wrap
                        justify-center
                    ">

                        <Chip
                            value={test.schoolclass?.name}
                            className="w-min"
                            style={{
                                backgroundColor:
                                    test.schoolclass?.color ??
                                    "black"
                            }}
                        />

                        {test.testTag && (
                            <TestTagChip
                                testTag={test.testTag}
                            />
                        )}

                        <Chip
                            value={
                                "Trimestre " +
                                test.trimester[2]
                            }
                            className="w-min"
                        />

                        <Chip
                            value={
                                new Date(
                                    test.date
                                ).toLocaleDateString()
                            }
                            icon={<CalendarIcon />}
                            className="w-min"
                        />

                        <Chip
                            value={
                                "coeff. " +
                                test.coefficient
                            }
                            className="w-min"
                        />

                    </div>


                    <div className="
                        border-0
                        border-black
                        border-b-2
                        pb-2
                        mb-2
                    ">

                        {test.description && (
                            <Typography
                                as="p"
                                className="text-center"
                            >
                                {test.description}
                            </Typography>
                        )}

                    </div>


                    {numUnmarked !== test.schoolclass?.count ? (

                        <div className="
                            flex
                            flex-col
                            justify-between
                            items-start
                        ">

                            <div className="w-full">

                                <HorizontalTestChart
                                    data={{
                                        graduated: numMarked,
                                        nonGraduated:
                                            studentTests.filter(
                                                st =>
                                                    st.isUnmarked
                                            ).length,
                                        absent: numAbsent,
                                        total:
                                            test.schoolclass
                                                ?.count ?? 0
                                    }}
                                />

                            </div>

                            <div>

                                <span className="
                                    font-semibold
                                    mt-1
                                ">
                                    Moyenne
                                </span>

                                {" : "}

                                <b>
                                    {average.toFixed(2)}
                                </b>

                                {" / "}

                                {test.scale}

                            </div>

                        </div>

                    ) : (

                        <div className="
                            flex
                            flex-col
                            p-3
                        ">

                            <span className="text-center">
                                Aucun élève n'a encore été
                                évalué.
                            </span>

                            <Button
                                onClick={onGoHome}
                                className="
                                    bg-test-300
                                    text-black
                                "
                                disabled
                            >
                                Saisissez les résultats
                            </Button>

                        </div>

                    )}

                </div>


                {/* ========================================== */}
                {/* SKILLS                                      */}
                {/* ========================================== */}

                <div className="
                    mt-5
                    bg-white
                    rounded-xl
                    p-3
                    w-full
                ">

                    <Typography
                        as="h3"
                        className="
                            font-logo
                            text-center
                            border-0
                            border-black
                            border-b-2
                            mb-2
                        "
                    >
                        Compétences évaluées
                    </Typography>


                    {test.skills.length > 0 ? (

                        <div className="
                            flex
                            justify-around
                            items-center
                            flex-wrap
                        ">

                            {test.skills.map(skill => (

                                <div
                                    key={skill.id}
                                    className="
                                        inline-block
                                        m-3
                                    "
                                >

                                    <Typography className="
                                        text-center
                                    ">
                                        {skill.name}
                                    </Typography>

                                    <RadialSkillIndicator
                                        level={
                                            getAverageSkillById(
                                                studentTests,
                                                skill.id
                                            )
                                        }
                                        size={60}
                                        strokeWidth={6}
                                    />

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="
                            flex
                            flex-col
                            p-3
                        ">

                            <span className="text-center">
                                Aucune compétence évaluée.
                            </span>

                            <Button
                                onClick={onEditTest}
                                className="
                                    bg-test-300
                                    text-black
                                "
                            >
                                Ajoutez des compétences à
                                évaluer
                            </Button>

                        </div>

                    )}

                </div>

            </div>

        </Card>

    );

}
