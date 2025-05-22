import { Card, Typography } from "@material-tailwind/react";
import Wrapper from "../../components/ui/wrapper";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";
import ClassList from "../../components/classList";

export default function SchoolClassPage() {

    return(
        <Wrapper extraClass="flex flex-col gap-5">
            <Card className="row-span-3 mt-6 py-5 bg-test-200 text-black flex justify-between items-center">
                <h1 className="text-black">Mes classes</h1>
                <Typography as="h2" className="text-xl font-semibold">Bienvenue <span className="text-test-400">super_prof</span> !</Typography>
                <img src="\src\assets\smiling_postit.svg" alt="smiling post-it"/>
                <Typography as="p" className="text-xl">Vos élèves n'attendent plus que vous !</Typography>
            </Card>

            <div className="row-span-1">
                <ClassList/>
            </div>

            <DefaultLinkButton
                label="Ajouter une classe"
                height={75}
                to="/forms/new"
            />
           
        </Wrapper>
    )
}

