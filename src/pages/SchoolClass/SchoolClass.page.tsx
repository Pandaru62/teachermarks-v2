import SchoolClassInterface from "../../interfaces/schoolclass.interface";
import { Card, Typography, Button } from "@material-tailwind/react";
import { getTextColor } from "../../utils/getTextColor.function";
import useSchoolClassesQueries from "./useSchoolClassesQueries";
import { useStore } from "zustand";
import { useAuthStore } from "../../hooks/useAuthStore";
import Wrapper from "../../components/ui/wrapper";
import { Link } from "react-router-dom";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";

export default function SchoolClassPage() {

    const { schoolClasses, schoolClassesError, schoolClassesLoading } = useSchoolClassesQueries()
    console.log("🚀 ~ SchoolClassPage ~ schoolClasses:", schoolClasses)

    const currentUser = useStore(useAuthStore)
    console.log("🚀 ~ SchoolClassPage ~ currentUser:", currentUser.user)

    return(
        <Wrapper extraClass="flex flex-col gap-5">
            <Card className="row-span-3 mt-6 py-5 bg-test-200 text-black flex justify-between items-center">
                <h1 className="text-black">Mes classes</h1>
                <Typography as="h2" className="text-xl font-semibold">Bienvenue <span className="text-test-400">super_prof</span> !</Typography>
                <img src="\src\assets\smiling_postit.svg" alt="smiling post-it"/>
                <Typography as="p" className="text-xl">Vos élèves n'attendent plus que vous !</Typography>
            </Card>

            <div className="row-span-1 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {schoolClasses?.map((schoolClass:SchoolClassInterface) => (
                <Link to={`/forms/${schoolClass.id}`} className="" key={schoolClass.id}>
                    <Button className="w-full rounded-[15px] custom-shadow" size="lg" style={{ backgroundColor: schoolClass.color, color: getTextColor(schoolClass.color)}}>
                        <Typography className="font-extrabold text-2xl">{schoolClass.name}</Typography>
                    </Button>
                </Link>
                ))}
            </div>

            <DefaultLinkButton
                label="Ajouter une classe"
                height={75}
                to="/forms/new"
            />
           
        </Wrapper>
    )
}

