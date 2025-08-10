import TestForm from "../../components/forms/TestForm";
import Wrapper from "../../components/ui/wrapper";
import useSchoolClassesQueries from "../../hooks/schoolClass/useSchoolClassesQueries";
import { useAuthStore } from "../../hooks/useAuthStore";
import { TrimesterEnum } from "../../interfaces/test.interface";

export default function TestAddPage() {

    const today = new Date().toISOString().split('T')[0];
    const {schoolClasses, schoolClassesError, schoolClassesLoading} = useSchoolClassesQueries();
    const {user} = useAuthStore();
    
    return(
        <Wrapper>
            {schoolClassesError && <p>Une erreur est survenue. Veuillez réessayer.</p>}
            {schoolClassesLoading && <p>Chargement en cours.</p>}
            {schoolClasses && schoolClasses.length > 0 ? (
                <TestForm
                initialValues={{
                    name: "",
                    coefficient: 1,
                    date: today,
                    description: "",
                    scale: 20,
                    trimester: user?.current_trimester ?? TrimesterEnum.TR1,
                    schoolClassId: schoolClasses[0].id,
                }}
                schoolClasses={schoolClasses}
            />
            ) : (
                <div>
                    Une erreur est survenue. Avez-vous pensé à ajouter une classe ?
                </div>
            )}
        </Wrapper>
    )
}