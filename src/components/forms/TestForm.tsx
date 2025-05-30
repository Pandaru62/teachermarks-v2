import { Card } from "@material-tailwind/react";
import BackButton from "../ui/backButton";
import DefaultButton from "../ui/defaultButton";
import TextInput from "../ui/formInput/textInput";
import Wrapper from "../ui/wrapper";
// import { useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import { TestFormProps, useTestForm } from "../../hooks/test/useTestForm";
import SelectInput from "../ui/formInput/selectInput";
import { TrimesterEnum } from "../../interfaces/test.interface";
import SelectEnumInput from "../ui/formInput/selectEnumInput";
import useSkillsQuery from "../../hooks/skill/useSkillsQuery";
import SelectSkills from "../ui/formInput/selectSkills";


export default function TestForm({ initialValues, editTestId, schoolClasses }: TestFormProps) {
  
    // const navigate = useNavigate();
    const {
        formik,
        selectedSkills,
        setSelectedSkills
    } = useTestForm({initialValues, editTestId});
    const {skills, skillsError, skillsLoading} = useSkillsQuery();
    
// const queryClient = useQueryClient();
// const mutation = useMutation({
//     mutationFn: archiveSchoolClass,
//     onSuccess: (editedClass : SchoolClassInterface) => {
//         queryClient.setQueryData(['schoolClasses'], (oldSchoolClasses : SchoolClassInterface[]) =>
//             oldSchoolClasses ? oldSchoolClasses.map((schoolClass) => schoolClass.id === editClassId ? editedClass : schoolClass) : []);
    
//         queryClient.setQueryData(['schoolClass', editClassId], editedClass);
//     },
//   });

    return(
        <form onSubmit={formik.handleSubmit}>
            <Wrapper extraClass="flex flex-col gap-3">
                <Card 
                    className="mt-6 py-5 bg-test-200 text-black flex justify-between items-center"
                >
                    <div className="flex gap-3">
                        <BackButton/>
                        <h1 className="text-black mb-3">Mon évaluation</h1>
                        {/* {editTestId && (
                            <IconButton color="white" onClick={() => showWarningAlert("Voulez-vous archiver cette classe ?", () => mutation.mutate(editClassId), "Classe archivée avec succès", () => navigate("/forms"))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#F46030" d="m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zM5 8v11h14V8zm0 13q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zm6.6 7.5"/></svg>
                            </IconButton>
                        )} */}
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
                                defaultOption={TrimesterEnum.TR2}
                                name="trimester"
                                options={Object.values(TrimesterEnum)}
                                onChange={formik.handleChange}
                                error={formik.touched.trimester && formik.errors.trimester}
                            />
                        
                            {schoolClasses && (
                                <SelectInput
                                    label="Classe"
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