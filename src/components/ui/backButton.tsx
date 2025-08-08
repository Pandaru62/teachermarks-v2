import { IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
    extraClass? : string
}

export default function BackButton(props: BackButtonProps) {

    const {extraClass} = props;

    const navigate = useNavigate();
    return (
            <IconButton color="white" className={`rounded-xl ${extraClass}`} onClick={() => navigate(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 48 48"><g fill="none" stroke="#F46030" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6"><path d="m13 8l-7 6l7 7"/><path d="M6 14h22.994c6.883 0 12.728 5.62 12.996 12.5c.284 7.27-5.723 13.5-12.996 13.5H11.998"/></g></svg>
            </IconButton>
    )
}