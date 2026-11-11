import { UsersIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

interface SchoolClassCardsProps {
    schoolClasses: {
        id: number,
        color: string,
        name: string,
        _count?: {
            students: number,
            test: number
        }
    }[]
}

export default function SchoolClassCards(props: SchoolClassCardsProps) {
    const { schoolClasses } = props;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {schoolClasses.map((sc) => (
                        <Link
                            key={sc.id}
                            to={`/forms/${sc.id}`}
                            style={{ "--class-color": sc.color } as React.CSSProperties}
                            className="group relative bg-white border border-gray-100 border-t-[3px] rounded-xl px-3 py-3 transition-all hover:shadow-md hover:border-[var(--class-color)]"
                        >
                            <div
                                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl"
                                style={{ backgroundColor: sc.color }}
                            />

                            <div className="flex items-center gap-1.5">
                                <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: sc.color }}
                                />
                                <Typography className="font-medium text-sm truncate">{sc.name}</Typography>
                            </div>

                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1.5 transition-colors group-hover:text-[var(--class-color)]">
                                <UsersIcon className="w-3.5 h-3.5" />
                                {sc._count?.students} élèves
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5 transition-colors group-hover:text-[var(--class-color)]">
                                <ClipboardDocumentListIcon className="w-3.5 h-3.5" />
                                {sc._count?.test} évaluation{sc._count && sc._count?.test > 1 && 's'}
                            </div>
                        </Link>
                    ))}
                </div>
    )
}