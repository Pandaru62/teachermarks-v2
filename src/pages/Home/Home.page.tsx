import { useStore } from "zustand";
import HomeVisitor from "./Home.visitor";
import { useAuthStore } from "../../hooks/useAuthStore";
import HomeLoggedUser from "./Home.loggeduser";

export default function HomePage() {

    const currentUser = useStore(useAuthStore);
    console.log("🚀 ~ HomePage ~ currentUser:", currentUser)

    

    return(
        <>
            {currentUser.user ? 
                <HomeLoggedUser/> : <HomeVisitor/>
            }
        </>
    )
}