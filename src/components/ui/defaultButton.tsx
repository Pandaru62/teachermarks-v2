import { Button, Typography } from "@material-tailwind/react";

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined,
    label : string,
    height : number,
    background?: string
    opacity?: number
    extraClass?: string
}

export default function DefaultButton(props: ButtonProps) {

    const {type, label, height, background = 'bg-test-300', opacity = 0, extraClass} = props;

    return (
        <Button 
            className={`w-full h-[${height}px] rounded-[15px] custom-shadow ${background} bg-opacity-${opacity} text-black ${extraClass}"`}
            size="lg" 
            type={type}>
            <Typography className="font-semibold text-2xl">{label}</Typography>
        </Button>
    )
}