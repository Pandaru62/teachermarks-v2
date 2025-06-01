import { Card, IconButton, Typography } from "@material-tailwind/react";
import BackButton from "../ui/backButton";
import DefaultButton from "../ui/defaultButton";
import TextInput from "../ui/formInput/textInput";
import Wrapper from "../ui/wrapper";
import TextAreaInput from "../ui/formInput/textAreaInput";
import SkillBubble from "../ui/skill/skillBubble";
import { useSkillForm } from "../../hooks/skill/useSkillForm";
import { showWarningAlert } from "../../utils/alerts/warningAlert";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveSkill } from "../../api/skill";
import SkillInterface from "../../interfaces/skill.interface";
import { SkillLevelEnum } from "../../interfaces/student-test.interface";

export interface SkillFormProps {
  initialValues: { name: string; description: string; abbreviation: string };
  editSkillId?: number;
}

export default function SkillForm({ initialValues, editSkillId }: SkillFormProps) {
  
    const navigate = useNavigate();
    const {
        formik,
    } = useSkillForm({initialValues, editSkillId});

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: archiveSkill,
        onSuccess: (editedSkill: SkillInterface) => {
        queryClient.setQueryData(['skills'], (oldSkills : SkillInterface[]) =>
            oldSkills ? oldSkills.map((skill) => skill.id === editSkillId ? editedSkill : skill) : []);
        
        queryClient.setQueryData(['skill', editSkillId], editedSkill)
        },
    });

    return(
        <form onSubmit={formik.handleSubmit}>
            <Wrapper extraClass="flex flex-col gap-5">
                <Card 
                    className="mt-6 p-5 bg-test-200 text-black flex justify-between items-center"
                >
                    <div className="flex gap-3">
                        <BackButton/>
                        <h1 className="text-black mb-3">Ma compétence</h1>
                        {editSkillId && (
                            <IconButton color="white" onClick={() => showWarningAlert("Voulez-vous archiver cette compétence ?", () => mutation.mutate(editSkillId), "Classe archivée avec succès", () => navigate("/skills"))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#F46030" d="m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zM5 8v11h14V8zm0 13q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zm6.6 7.5"/></svg>
                            </IconButton>
                        )}
                    </div>

                    <div className="flex flex-col gap-3">
                        <TextInput
                            label="Nom de la compétence"
                            name="name"
                            value={formik.values.name}
                            onChange={(e) => {
                                const name = e.target.value;
                                formik.setFieldValue('name', name);

                                // Auto-fill abbreviation with first letter, if empty or 1 char long
                                if (!formik.values.abbreviation || formik.values.abbreviation.length <= 1) {
                                const firstLetter = name.charAt(0).toUpperCase();
                                formik.setFieldValue('abbreviation', firstLetter);
                                }
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                        />

                        <div className="flex flex-col justify-center">
                            <label htmlFor="abbreviation" className="text-xl font-semibold text-black text-center">Abbréviation de la compétence</label>
                            <div className="mt-1 grid grid-cols-3 gap-3">
                                <input 
                                    id="abbreviation"
                                    name="abbreviation"
                                    value={formik.values.abbreviation.toUpperCase()}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="rounded-xl p-2 text-black text-center"
                                />
                                <div className="col-span-2 bg-white bg-opacity-70 rounded-xl p-2 flex justify-around">
                                {[SkillLevelEnum.LVL1, SkillLevelEnum.LVL2, SkillLevelEnum.LVL3, SkillLevelEnum.LVL4].map(skillLevel => (
                                    <SkillBubble key={skillLevel} level={skillLevel} letter={formik.values.abbreviation} />
                                ))}
                                </div>  
                            </div>
                            {formik.touched.abbreviation && formik.errors.abbreviation && (
                            <Typography variant="small" color="pink" className="flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-6h2v2h-2zm0-10h2v8h-2z"/></svg> 
                                {formik.errors.abbreviation}
                            </Typography>)
                            }
                        </div>
                        <TextAreaInput
                            label="Description de la compétence"
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && formik.errors.description}
                            rows={5}
                        />
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