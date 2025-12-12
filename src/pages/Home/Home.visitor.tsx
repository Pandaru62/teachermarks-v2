import { Button, Card, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import background from "../../assets/Flying_background.png";

export default function HomeVisitor() {

    const [buttonIsDisplayed, setButtonIsDisplayed] = useState<boolean>(true);

    const handleClick = () => {
        setButtonIsDisplayed(!buttonIsDisplayed);
    }

    return(
        <div className="flex flex-col items-center w-full">
            <Card className="w-full md:w-2/3 mt-6 py-3 bg-test-200">
                <h1 className="text-black text-center">Notez tous les progrès.</h1>
                <img src={background} alt="flying background" className="w-full h-48 md:h-80 lg:h-96 object-cover mt-3 rounded-md"/>
            </Card>

            <div className="w-full md:w-2/3 flex flex-col mt-5 items-stretch">
                <h2 className="text-center">À vos marques, prêts...</h2>
                {buttonIsDisplayed ?
                (
                    <Button className="rounded-[15px] custom-shadow bg-amber-custom text-black" size="lg" onClick={handleClick}>
                        <Typography className="font-[Teachers] font-extrabold text-xl lg:text-3xl">MARKEZ !</Typography>
                    </Button>
                ) : (
                    <div className="w-full flex flex-col md:flex-row gap-4">
                        <Link to={'/signin'} className="w-full">
                            <Button className="w-full rounded-[15px] custom-shadow h-[90px] bg-amber-custom bg-opacity-60 text-black" size="md">
                                <Typography className="font-[Teachers] font-bold text-xl">ME CONNECTER</Typography>
                            </Button>
                        </Link>
                        <Link to={'/signup'} className="w-full">
                            <Button className="w-full rounded-[15px] custom-shadow h-[90px] bg-amber-custom text-black" size="md">
                                <Typography className="font-[Teachers] font-bold text-xl">M'INSCRIRE</Typography>
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

        </div>
    )
}