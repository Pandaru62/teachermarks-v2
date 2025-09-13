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
        <div className="flex flex-col items-center">
            <Card className="mt-6 w-96 bg-test-200">
                    <div className="h-[100px] flex items-center justify-center">
                        <h1 className="text-black">Notez tous les progrès.</h1>
                    </div>
                    <img src={background} alt="flying background"/>
                    <div className="h-[100px]">
                    </div>
            </Card>

            <div className="container-fluid flex flex-col mt-5 items-stretch">
                <h2 className="text-center">À vos marques, prêts...</h2>
                {buttonIsDisplayed ?
                (
                    <Button className="rounded-[15px] custom-shadow h-[90px] bg-amber-custom text-black" size="lg" onClick={handleClick}>
                        <Typography className="font-[Teachers] font-extrabold text-5xl">MARKEZ !</Typography>
                    </Button>
                ) : (
                    <div className="flex gap-4">
                        <Link to={'/signin'} className="w-1/2 block">
                            <Button className="w-full rounded-[15px] custom-shadow h-[90px] bg-amber-custom bg-opacity-60 text-black" size="md">
                                <Typography className="font-[Teachers] font-bold text-xl">ME CONNECTER</Typography>
                            </Button>
                        </Link>
                        <Link to={'/signup'} className="w-1/2 block">
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