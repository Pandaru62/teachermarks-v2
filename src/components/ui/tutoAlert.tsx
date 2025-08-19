import { Alert, Typography, Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { disableFirstVisit } from "../../api/user";
import useSchoolClassesQueries from "../../hooks/schoolClass/useSchoolClassesQueries";
import useSkillsQuery from "../../hooks/skill/useSkillsQuery";
import { useAuthStore } from "../../hooks/useAuthStore";

export default function TutoAlert() {

    const { schoolClasses } = useSchoolClassesQueries();
    const { skills } = useSkillsQuery();
    const { user, setUser } = useAuthStore();
    const [open, setOpen] = useState(true);

    const mutation = useMutation({
        mutationFn: disableFirstVisit,
        onSuccess: () => {
            if(user) {
                setUser({...user, is_first_visit: false})
            }
        }
      });

    return(
        <Alert variant="ghost" open={open} onClose={() => setOpen(false)}>
            <Typography className="font-medium">
                Tutoriel de démarrage | Pour bien commencer :
            </Typography>
            <ul className="mt-2 ml-2">
                <li className="flex gap-1">
                    {schoolClasses && schoolClasses?.length === 0 ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16"><g fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="m10.25 5.75-4.5 4.5m0-4.5 4.5 4.5"></path><circle cx={8} cy={8} r={6.25}></circle></g></svg>
                        <Link to="/forms/new">
                            Ajoutez une classe
                        </Link>
                    </>
                    ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="green" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"></path></svg>
                        <Link to="/forms/new">
                            Ajoutez une classe
                        </Link>
                    </>
                    )}
                </li>
                <li className="flex gap-1">
                    {skills && skills?.length === 0 ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16"><g fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="m10.25 5.75-4.5 4.5m0-4.5 4.5 4.5"></path><circle cx={8} cy={8} r={6.25}></circle></g></svg>
                        <Link to="/skills/new">
                            Ajoutez des compétences
                        </Link>
                    </>
                    ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="green" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"></path></svg>
                        <Link to="/skills/new">
                            Ajoutez des compétences
                        </Link>
                    </>
                    )}
                </li>
                <li className="flex gap-1">
                    {!user?.firstname || !user?.lastname ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16"><g fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}><path d="m10.25 5.75-4.5 4.5m0-4.5 4.5 4.5"></path><circle cx={8} cy={8} r={6.25}></circle></g></svg>
                        <Link to="/profile/edit">
                            Complétez votre profil
                        </Link>
                    </>
                    ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="green" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"></path></svg>
                        <Link to="/profile/edit">
                            Complétez votre profil
                        </Link>
                    </>
                    )}
                </li>
            </ul>
            <Button 
                color="amber"
                className="mt-2"
                onClick={() => mutation.mutate()}
                disabled={!skills || skills?.length === 0 || !schoolClasses || schoolClasses?.length ===  0 || !user?.firstname || !user?.lastname}
            >
                Terminer le tutoriel
            </Button>
        </Alert>
    )
}