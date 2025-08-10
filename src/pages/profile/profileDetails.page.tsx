import { Button, Card, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react"
import PreferencesForm from "../../components/forms/PreferencesForm"
import { useState } from "react";
import Wrapper from "../../components/ui/wrapper";
import { useStore } from "zustand";
import { useAuthStore } from "../../hooks/useAuthStore";
import TopCard from "../../components/ui/topCard";
import ProfileForm from "../../components/forms/ProfileForm";

export default function ProfileDetailsPage() {

    const[ProfileModalOpen, setProfileModalOpen] = useState<boolean>(false);
    
    const handleProfileModal = () => {
        setProfileModalOpen(!ProfileModalOpen)
    }

    const currentUser = useStore(useAuthStore);
    

    return (
    <Wrapper>
        <TopCard
            cardClass=""
            title1 = "Mon profil"
            title2= "Bienvenue"
            paragraph="Ces renseignements n'apparaissent qu'à titre personnel afin de personnaliser votre expérience."
        />

        <div className="mt-3 flex flex-col lg:flex-row gap-5 items-center justify-center">
            <Card className="p-3">
                <ul>
                    <li>Nom : {currentUser.user?.lastname}</li>
                    <li>Prénom : {currentUser.user?.firstname}</li>
                    <li>Adresse e-mail : {currentUser.user?.email}</li>
                    <li>Établissement : {currentUser.user?.school}</li>
                </ul>
            </Card>
            <Button onClick={handleProfileModal}>Modifier mon profil</Button>
        </div>
        <h2>Préférences</h2>
        <PreferencesForm/>

        <Dialog open={ProfileModalOpen} handler={handleProfileModal}>
            <DialogHeader>Modifier mon profil</DialogHeader>
            <DialogBody>
                <ProfileForm user={currentUser.user}/>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleProfileModal}
                    className="mr-1"
                >
                    <span>Annuler</span>
                </Button>
                {/* <Button variant="gradient" color="green" onClick={handleProfileModal}>
                    <span>Confirm</span>
                </Button> */}
            </DialogFooter>
        </Dialog>
    </Wrapper>
    )
}