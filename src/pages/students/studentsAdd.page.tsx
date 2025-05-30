import { useParams } from "react-router-dom"
import useSchoolClassQuery from "../../hooks/schoolClass/useSchoolClassQuery";
import { Stepper, Step, Card, Typography, IconButton, Button, Alert } from "@material-tailwind/react";
import { useState } from "react";
import Wrapper from "../../components/ui/wrapper";
import BackButton from "../../components/ui/backButton";
import TextAreaInput from "../../components/ui/formInput/textAreaInput";
import DefaultButton from "../../components/ui/defaultButton";
import StudentsList from "../../components/ui/studentsList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createManyStudents } from "../../api/student";
import StudentInterface from "../../interfaces/student.interface";
import DefaultLinkButton from "../../components/ui/defaultLinkButton";

export default function StudentsAddPage() {

    const formId = Number(useParams().id);
    const queryClient = useQueryClient();

    
    
    const {schoolClass, schoolClassError, schoolClassLoading} = useSchoolClassQuery(formId);
    
    const [activeStep, setActiveStep] = useState<number>(0);
    const [studentsArea, setStudentsArea] = useState<string>("");
    const [students, setStudents] = useState<{firstName: string, lastName: string, schoolClassId: number, hidden?: boolean}[]>([]);
    const [addedStudents, setAddedStudents] = useState<StudentInterface[] | null>(null);
    
    const mutation = useMutation({
        mutationFn: createManyStudents,
        onSuccess: (students : StudentInterface[]) => {
            setAddedStudents(students);
            // update query allStudents
            queryClient.setQueryData(['students'], (oldStudents : StudentInterface[]) =>
                oldStudents ? [...oldStudents, students] : []);
        
            // update query studentsByClass
            queryClient.setQueryData(['classStudents', formId], (oldStudents : StudentInterface[]) =>
                oldStudents ? [...oldStudents, students] : []);
        }
    });

    // Quand on clique "Continuer" à l'étape 0
    const handleParseStudents = () => {
        const parsed = studentsArea.split("\n").map((line) => {
            const parts = line.trim().split(" ");
            const firstName = parts.pop() ?? "";
            const lastName = parts.join(" ");
            return { lastName, firstName, schoolClassId: formId, hidden: false };
        });
        setStudents(parsed);
        setActiveStep(1);
    };

    const handleChange = (index: number, field: "firstName" | "lastName", value: string) => {
        const updated = [...students];
        updated[index][field] = value;
        setStudents(updated);
    };

    const handleLastStep = () => {
        const visibleStudents = students.filter(
            (s) => !s.hidden && s.lastName.trim() !== "" && s.firstName.trim() !== ""
        );

        mutation.mutate(visibleStudents);
        setActiveStep(2);
    };

    const handleDelete = (index: number) => {
        setStudents((prev) =>
            prev.map((s, i) =>
            i === index ? { ...s, hidden: true } : s
            )
        );
    };

    const handleAdd = () => {
        setStudents((prev) => [...prev, { firstName: "", lastName: "", schoolClassId: formId, hidden: false }])
    };
  
    return (
        <>
        {schoolClassError && (<p>Erreur</p>)}
        {schoolClassLoading && (<p>Chargement en cours...</p>)}
        {schoolClass && (
            <Wrapper extraClass="flex flex-col gap-5">
                <Card 
                    className="mt-6 p-5 text-black flex justify-between items-center"
                    style={{ backgroundColor: schoolClass.color }}
                >
                    <div className="flex gap-3 items-center mb-2">
                        <BackButton />
                        <h1 className="text-black">{schoolClass.name}</h1>
                    </div>
                    <Typography as="p" className="text-xl font-semibold">Rajoutez les élèves de la {schoolClass.name} !</Typography>
                    <Stepper
                        activeStep={activeStep}
                        className="my-5"
                    >
                        <Step onClick={() => activeStep < 2 && setActiveStep(0)}>1</Step>
                        <Step onClick={() => activeStep ==1 && setActiveStep(1)}>2</Step>
                        <Step onClick={() => activeStep > 1 && setActiveStep(2)}>3</Step>
                    </Stepper>
                    
                    {activeStep === 0 && (
                        <div className="w-full lg:w-1/2 flex flex-col gap-3 items-stretch">
                            <TextAreaInput
                                label="Collez ici les noms de vos élèves"
                                name="students"
                                rows={15}
                                value={studentsArea}
                                placeholder="NOM prénom (passez une ligne pour chaque élève)"
                                onChange={(e) => setStudentsArea(e.target.value)}
                            />
                            <DefaultButton
                                height={75}
                                label="Continuer"
                                type="button"
                                onClick={() => handleParseStudents()}
                            />
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div>
                            <p className="mb-3 bg-white text-center rounded-xl w-max mx-auto px-3">{students.filter((s) => s.hidden === false).length} élève(s) vont être ajouté(s) à la classe</p>
                            {students?.map((student, index) => {
                                if (student.hidden) return null;

                                return (
                                <div key={index} className="flex flex-col">
                                    {index === 0 && (
                                        <div className="grid grid-cols-3">
                                            <span></span>
                                            <span>Nom</span>
                                            <span>Prénom</span>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-7 gap-2 mb-2">
                                        <div className="flex justify-center">
                                            <IconButton size="sm" color="white" className="col-span-1 rounded-xl" onClick={() => handleDelete(index)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="red" d="M10 20a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m5-9v2H5V9z"/></svg>
                                            </IconButton>
                                        </div>
                                        <input
                                            type="text"
                                            defaultValue={student.lastName}
                                            placeholder="Nom"
                                            onChange={(e) => handleChange(index, "lastName", e.target.value)}
                                            className="border p-1 rounded col-span-3"
                                        />
                                        <input
                                            type="text"
                                            defaultValue={student.firstName}
                                            placeholder="Prénom"
                                            className="border p-1 rounded col-span-3"
                                            onChange={(e) => handleChange(index, "firstName", e.target.value)}
                                        />
                                    </div>
                                </div>
                                );
                            })}
                            <Button className="w-full mb-3 flex items-center justify-center gap-3" color="white" onClick={() => handleAdd()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 50 50"><path fill="green" d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"/><path fill="green" d="M16 24h18v2H16z"/><path fill="green" d="M24 16h2v18h-2z"/></svg> 
                                <span className="text-green-600">Ajouter un élève</span>
                            </Button>
                            <DefaultButton
                                height={75}
                                label="Continuer"
                                type="button"
                                onClick={() => handleLastStep()}
                            />
                        </div>

                    )}

                    {activeStep === 2 && (
                        <div>
                            <div>
                                {mutation.isPending ? ('Ajout des élèves en cours...') : (
                                <>
                                    {mutation.isError ? ( <div>Une erreur s'est produite: {mutation.error.message}</div> ) : null}
                                    {mutation.isSuccess ? (
                                        <>
                                            <Alert
                                                icon={<svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 24 24"
                                                        fill="currentColor"
                                                        className="h-6 w-6"
                                                        >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                                            clipRule="evenodd"
                                                        />
                                                        </svg>}
                                                className="rounded-none border-l-4 border-[#2ec946] bg-[#2ec946]/10 font-medium text-[#2ec946]"
                                                >
                                                Ajout effectué !
                                            </Alert>
                                            <div className="bg-white rounded-xl p-5 my-3">
                                                <StudentsList students={addedStudents ?? []} />
                                            </div>
                                            <DefaultLinkButton
                                                label="Mes classes"
                                                to="/forms"
                                            />
                                        </>
                                    ) : null}
                                </>
                                )}
                            </div>
                            
                        </div>
                    )}        
                    
                </Card>
 
            </Wrapper>
        )}
        </>
    )
}

