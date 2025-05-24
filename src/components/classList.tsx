import useSchoolClassesQueries from "../hooks/schoolClass/useSchoolClassesQueries"
import { Button, Typography } from "@material-tailwind/react"
import { Link } from "react-router-dom"
import { getTextColor } from "../utils/getTextColor.function"
import SchoolClassInterface from "../interfaces/schoolclass.interface"

export default function ClassList() {

    const { schoolClasses, schoolClassesError, schoolClassesLoading } = useSchoolClassesQueries()

    return (
    <>
        <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-3">
        {schoolClasses?.map((schoolClass:SchoolClassInterface) => (
            <Link to={`/forms/${schoolClass.id}`} key={schoolClass.id}>
                <Button className="w-full rounded-[15px] custom-shadow" size="lg" style={{ backgroundColor: schoolClass.color, color: getTextColor(schoolClass.color)}}>
                    <Typography className="font-extrabold text-2xl">{schoolClass.name}</Typography>
                </Button>
            </Link>
            ))}
        </div>

        <div className="lg:hidden relative w-full p-2 rounded-xl">
            <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-4 hide-scrollbar">
                {schoolClasses?.map((schoolClass : SchoolClassInterface) => (
                <Link
                    to={`/forms/${schoolClass.id}`}
                    key={schoolClass.id}
                    className="snap-start shrink-0"
                >
                    <Button
                    className="rounded-[15px] custom-shadow w-[90]"
                    size="lg"
                    style={{
                        backgroundColor: schoolClass.color,
                        color: getTextColor(schoolClass.color),
                    }}
                    >
                    <Typography className="font-extrabold text-2xl">
                        {schoolClass.name}
                    </Typography>
                    </Button>
                </Link>
                ))}
            </div>
        </div>
    </>
  
    )
}