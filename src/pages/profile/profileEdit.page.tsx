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
                </div>
                <ProfileForm user={currentUser.user}/>
            </Card>

       </Wrapper>
    )

}