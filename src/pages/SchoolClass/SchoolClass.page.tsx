import SchoolClassInterface from "../../interfaces/schoolclass.interface";
import { Card, CardBody, Typography, IconButton } from "@material-tailwind/react";
import { getTextColor } from "../../utils/getTextColor.function";
import useSchoolClassesQueries from "./useSchoolClassesQueries";
import { useStore } from "zustand";
import { useAuthStore } from "../../hooks/useAuthStore";
import Wrapper from "../../components/ui/wrapper";

export default function SchoolClassPage() {

    const { schoolClasses, schoolClassesError, schoolClassesLoading } = useSchoolClassesQueries()
    console.log("🚀 ~ SchoolClassPage ~ schoolClasses:", schoolClasses)

    const currentUser = useStore(useAuthStore)
    console.log("🚀 ~ SchoolClassPage ~ currentUser:", currentUser.user)

    return(
        <Wrapper extraClass="flex flex-col items-center">
            <h1 className="self-start">Mes classes</h1>
            <Card className="w-96">
                <CardBody>
                <div className="mb-4 flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray" className="">
                        Mes classes actives
                    </Typography>
                </div>
                <div className="divide-y divide-gray-200">
                {schoolClasses?.map((schoolClass:SchoolClassInterface) => (
                    <div
                    key={schoolClass.id}
                    className="flex items-center justify-between pb-3 pt-3 last:pb-0"
                    >
                    <div className="flex items-center gap-x-3">
                        <Typography 
                            variant="h4" 
                            className="w-24 text-center" 
                            style={{ backgroundColor: schoolClass.color, color: getTextColor(schoolClass.color)}}
                        >
                            {schoolClass.name}
                        </Typography>
                        <div>
                        <Typography color="blue-gray" variant="h6">
                            x Qté élèves
                        </Typography>
                        <Typography variant="small" color="gray">
                            x évaluations
                        </Typography>
                        </div>
                    </div>
                    <IconButton><i className="fas fa-pen"/></IconButton>
                    </div>
                ))}
                </div>
                </CardBody>
            </Card>
           
        </Wrapper>
    )
}

