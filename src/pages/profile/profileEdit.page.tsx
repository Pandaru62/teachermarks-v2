import Wrapper from "../../components/ui/wrapper";
import { Card } from "@material-tailwind/react";
import BackButton from "../../components/ui/backButton";
import ProfileForm from "../../components/forms/ProfileForm";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useStore } from "zustand";

export default function ProfileEditPage() {

    const currentUser = useStore(useAuthStore);
    
    return (
       <Wrapper>

            <Card className={`mt-6 py-5 bg-test-200 text-black flex p-5`}>
                <div className="flex gap-5 justify-between">
                    <BackButton/>
                    <h1 className="text-black">Modifier mon profil</h1>
                    {/* <IconButton color="white" className={`rounded-xl`} onClick={() => handleConfirmDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"></path></svg>
                    </IconButton> */}
                </div>
                <ProfileForm user={currentUser.user}/>
            </Card>

       </Wrapper>
    )

}