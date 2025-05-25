import Wrapper from "../../components/ui/wrapper";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";
import ClassList from "../../components/classList";
import TopCard from "../../components/ui/topCard";

export default function SchoolClassPage() {

    return(
        <Wrapper extraClass="flex flex-col gap-5">
            <TopCard
                cardClass=""
                title1 = "Mes classes"
                title2= "Bienvenue"
                paragraph="Vos élèves n'attendent plus que vous !"
            />

            <div>
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

