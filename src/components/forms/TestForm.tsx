import { Card } from "@material-tailwind/react";
import BackButton from "../ui/backButton";
import DefaultButton from "../ui/defaultButton";
import TextInput from "../ui/formInput/textInput";
import Wrapper from "../ui/wrapper";
import { TestFormProps, useTestForm } from "../../hooks/test/useTestForm";
import SelectInput from "../ui/formInput/selectInput";
import TestInterface, { TrimesterEnum } from "../../interfaces/test.interface";
import SelectEnumInput from "../ui/formInput/selectEnumInput";
import useSkillsQuery from "../../hooks/skill/useSkillsQuery";
import SelectSkills from "../ui/formInput/selectSkills";
import DeleteButton from "../ui/defaultIconButton";
import { showWarningAlert } from "../../utils/alerts/warningAlert";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteTest } from "../../api/tests";


export default function TestForm({ initialValues, editTestId, schoolClasses }: TestFormProps) {
  
    const {
        formik,
        selectedSkills,
        setSelectedSkills
    } = useTestForm({initialValues, editTestId});
    const {skills, skillsError, skillsLoading} = useSkillsQuery();
    const queryClient = useQueryClient();
    const navigate = useNavigate();


    const handleDelete = () => {
        if(editTestId) {
            showWarningAlert("Voulez-vous supprimer cette évaluation ?", () => mutation.mutate(editTestId), "Évaluation supprimée avec succès", () => navigate("/tests"))
        }
    }

    const mutation = useMutation({
        mutationFn: deleteTest,
        onSuccess: (deletedTest : TestInterface) => {
            queryClient.setQueryData(['allTests'], (oldTests : TestInterface[]) =>
                oldTests ? oldTests.filter((test) => test.id !== deletedTest.id) : []);
        
        },
      });

    return(
        <form onSubmit={formik.handleSubmit}>
            <Wrapper extraClass="flex flex-col gap-3">
                <Card 
                    className="mt-6 py-5 bg-test-200 text-black flex justify-between items-center"
                >
                    <div className="w-full flex justify-between items-center p-3">
                        <BackButton/>
                        <h1 className="text-black mb-3">Mon évaluation</h1>
                        <DeleteButton onClick={handleDelete}/>
                    </div>
                    <div className="flex flex-col gap-5 w-[96%]">
                        <TextInput
                            label="Nom de l'évaluation"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                        />

                        <TextInput
                            label="Description de l'évaluation"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && formik.errors.description}
                        />
                        <div className="flex flex-col lg:grid grid-cols-3 gap-5">
                            <TextInput
                                label="Date de l'évaluation"
                                name="date"
                                type="date"
                                value={formik.values.date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.date && formik.errors.date}
                            />

                            <SelectEnumInput
                                label="Trimestre"
                                defaultOption={formik.values.trimester}
                                name="trimester"
                                options={Object.values(TrimesterEnum)}
                                onChange={formik.handleChange}
                                error={formik.touched.trimester && formik.errors.trimester}
                            />
                        
                            {schoolClasses && (
                                <SelectInput
                                    label="Classe"
                                    disabled={editTestId !== undefined}
                                    value={formik.values.schoolClassId ?? schoolClasses[0].id}
                                    name="schoolClassId"
                                    options={schoolClasses.filter((schoolClass) => schoolClass.isArchived === false).map((schoolClass) => ({id: schoolClass.id, label: schoolClass.name}))}
                                    onChange={(e) => formik.setFieldValue("schoolClassId", Number(e.target.value))}     
                                    error={formik.touched.schoolClassId && formik.errors.schoolClassId}
                                />
                            )}

                            <TextInput
                                label="Barème"
                                name="scale"
                                type="number"
                                value={formik.values.scale}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.scale && formik.errors.scale}
                            />

                            <TextInput
                                label="Coefficient"
                                name="coefficient"
                                type="number"
                                value={formik.values.coefficient}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.coefficient && formik.errors.coefficient}
                            />
                        </div>
                        {skillsLoading && <p>Chargement des compétences en cours.</p>}
                        {skillsError && <p>Impossible de charger les compétences. Veuillez réactualiser</p>}
                        {skills && (
                            <SelectSkills 
                                skills={skills}
                                label="Sélectionnez les compétences"
                                name="skills" 
                                selectedSkills={selectedSkills}
                                setSelectedSkills={setSelectedSkills}
                            />
                        )}
                        

                        
                    </div>
                    
                </Card>

                <DefaultButton
                    height={75}
                    label="Valider"
                    type="submit"
                    background="bg-test-200"
                    opacity={60}
                />

            </Wrapper>

        </form>

        
    )
}