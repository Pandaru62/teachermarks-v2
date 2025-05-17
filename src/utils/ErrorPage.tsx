import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    return(
        <>
            <h1>
                Oups, une erreur s'est produite.
            </h1>

            <Button>
                <Link to="/">
                    Retourner à l'accueil
                </Link>
            </Button>
        </>
        
    )
}