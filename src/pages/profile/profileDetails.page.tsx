// import { Link, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../../components/ui/wrapper";

export default function ProfileDetailsPage() {

    

    return (
       <Wrapper>
            <h1>Mon profil</h1>
            <ul>
                <li>Adresse e-mail</li>
                <li>Nom</li>
                <li>Prénom</li>
                <li>Etablissement scolaire</li>
            </ul>
       </Wrapper>
    )


}