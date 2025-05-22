import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

interface ButtonProps {
    to: string
    label : string,
    height : number,
    background?: string
}

export default function DefaultLinkButton(props: ButtonProps) {

    const {label, height, to, background = 'bg-test-300'} = props;

    return (
        <Link to={to} className={`h-[${height}px] row-span-1`}>
            <Button className={`w-full rounded-[15px] custom-shadow ${background} text-black`} size="lg">
                <Typography className="font-extrabold text-2xl">{label}</Typography>
            </Button>
        </Link>
    )
}