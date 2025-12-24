import { useParams } from "react-router-dom";
import TestForm from "../../components/forms/TestForm";
import Wrapper from "../../components/ui/wrapper";
import useSchoolClassesQueries from "../../hooks/schoolClass/useSchoolClassesQueries";
import useTestQuery from "../../hooks/test/useTestQuery";

export default function TestEditPage() {

    const testId = Number(useParams().id);
    const {test, testError, testLoading} = useTestQuery(testId);
    const {schoolClasses} = useSchoolClassesQueries();

    return(
        <Wrapper>
            {testError && <p>Une erreur est survenue. Veuillez réessayer.</p>}
            {testLoading && <p>Chargement en cours.</p>}
            {test && schoolClasses && (
                <TestForm
                initialValues={{
                    name: test.name,
                    coefficient: test.coefficient,
                    date: new Date(test.date).toISOString().split('T')[0],
                    description: test.description ?? "",
                    scale: test.scale,
                    trimester: test.trimester,
                    schoolClassId: test.schoolClassId,
                    skills: test.skills,
                    testTagId: test.testTag?.id
                }}
                schoolClasses={schoolClasses}
                editTestId={testId}
            />
            )}
        </Wrapper>
    )
}