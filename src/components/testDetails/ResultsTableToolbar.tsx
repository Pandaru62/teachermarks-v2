import { Button, Typography } from "@material-tailwind/react";
import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/solid";


interface ResultsTableToolbarProps {
    studentsCount: number;
    isEditMode: boolean;
    isSaving: boolean;
    onEdit: () => void;
    onEditMobile: () => void;
    onCancel: () => void;
    onSave: () => void;
}


export default function ResultsTableToolbar({
    studentsCount,
    isEditMode,
    isSaving,
    onEdit,
    onEditMobile,
    onCancel,
    onSave,
}: ResultsTableToolbarProps) {

    return (
        <>

            {/* ============================================== */}
            {/* TABLE ACTION BAR                               */}
            {/* ============================================== */}

            <div className="
                flex
                justify-between
                items-start
                gap-3
                mb-3
                px-1
            ">

                <div>

                    <Typography
                        as="h3"
                        className="font-logo text-xl"
                    >
                        Résultats
                    </Typography>

                    <Typography className="
                        text-sm
                        text-gray-600
                    ">
                        {studentsCount} élèves
                    </Typography>

                </div>


                {!isEditMode ? (
                <>
                    <Button
                        onClick={onEdit}
                        className="
                            hidden
                            md:flex
                            items-center
                            gap-2
                            bg-test-300
                            text-black
                            normal-case
                            shadow-none
                            hover:shadow-md
                        "
                    >

                        <PencilIcon className="w-4 h-4" />

                        Modifier

                    </Button>
                    <Button
                        onClick={onEditMobile}
                        className="
                            flex
                            md:hidden
                            items-center
                            gap-2
                            bg-test-300
                            text-black
                            normal-case
                            shadow-none
                            hover:shadow-md
                        "
                    >

                        <PencilIcon className="w-4 h-4" />

                        Modifier

                    </Button>
                </>

                ) : (

                    <div className="
                        flex
                        gap-2
                    ">

                        <Button
                            variant="outlined"
                            onClick={onCancel}
                            disabled={isSaving}
                            className="
                                flex
                                items-center
                                gap-2
                                normal-case
                                border-gray-400
                                text-gray-800
                            "
                        >

                            <XMarkIcon className="w-4 h-4" />

                            Annuler

                        </Button>


                        <Button
                            onClick={onSave}
                            disabled={isSaving}
                            className="
                                flex
                                items-center
                                gap-2
                                bg-test-300
                                text-black
                                normal-case
                                disabled:opacity-60
                            "
                        >

                            <CheckIcon className="w-4 h-4" />

                            {isSaving
                                ? "Enregistrement..."
                                : "Enregistrer"}

                        </Button>

                    </div>

                )}

            </div>


            {/* ============================================== */}
            {/* EDIT MODE HELP                                  */}
            {/* ============================================== */}

            {isEditMode && (

                <div className="
                    mb-3
                    rounded-lg
                    bg-test-100
                    px-3
                    py-2
                    text-sm
                    text-center
                    text-white
                ">

                    <span className="font-semibold">
                        Mode édition
                    </span>

                    {" · "}

                    Utilisez{" "}
                    <kbd className="
                        rounded
                        border
                        border-gray-300
                        bg-white
                        text-black
                        px-1.5
                        py-0.5
                        font-mono
                        text-xs
                    ">
                        Tab
                    </kbd>{" "}
                    pour passer au champ suivant.

                </div>

            )}

        </>
    );

}
