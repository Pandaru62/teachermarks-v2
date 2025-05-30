import { useStore } from "zustand";
import HomeVisitor from "./Home.visitor";
import { useAuthStore } from "../../hooks/useAuthStore";
import HomeLoggedUser from "./Home.loggeduser";

export default function HomePage() {

    const currentUser = useStore(useAuthStore);

    return(
        <>
            {currentUser.user ? 
                <HomeLoggedUser/> : <HomeVisitor/>
            }
        </>
    )
}