import { Card, Typography } from "@material-tailwind/react";
import { useStore } from "zustand";
import { useAuthStore } from "../../hooks/useAuthStore";

interface TopCardProps {
    cardClass : string,
    title1: string,
    title2: string,
    imgPath?: string,
    imgAlt?: string,
    paragraph: string
}

export default function TopCard(props : TopCardProps) {

    const {
        cardClass, 
        title1, 
        title2, 
        imgPath = "/src/assets/smiling_postit.svg",
        imgAlt = "smiling post-it",
        paragraph
    } = props;

    const currentUser = useStore(useAuthStore);

    return (
        <Card className={`${cardClass} mt-6 py-5 bg-test-200 text-black flex justify-between items-center`}>
            <h1 className="text-black">{title1}</h1>
            <Typography as="h2" className="text-xl font-semibold">{title2} <span className="text-test-400">{currentUser.user?.firstname} {currentUser.user?.lastname}</span> !</Typography>
            <img src={imgPath} alt={imgAlt}/>
            <Typography as="p" className="text-xl text-center">{paragraph}</Typography>
        </Card>
    )
}