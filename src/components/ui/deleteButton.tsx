import { IconButton } from "@material-tailwind/react";

interface DeleteButtonProps {
    onClick : () => void;
}

export default function DeleteButton({onClick}: DeleteButtonProps) {

    return (
            <IconButton color="white" className="rounded-xl" onClick={() => onClick()}>
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="#F46030" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path strokeDasharray={24} strokeDashoffset={24} d="M12 20h5c0.5 0 1 -0.5 1 -1v-14M12 20h-5c-0.5 0 -1 -0.5 -1 -1v-14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0"></animate></path><path strokeDasharray={20} strokeDashoffset={20} d="M4 5h16"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="20;0"></animate></path><path strokeDasharray={8} strokeDashoffset={8} d="M10 4h4M10 9v7M14 9v7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="8;0"></animate></path></g></svg>
            </IconButton>
    )
}