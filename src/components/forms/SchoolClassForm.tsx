import { Card, IconButton } from "@material-tailwind/react";
import { useSchoolClassForm } from "../../hooks/schoolClass/useSchoolClassForm";
import BackButton from "../ui/backButton";
import ColorPickerModal from "../ui/ColorPickerModal";
import DefaultButton from "../ui/defaultButton";
import TextInput from "../ui/formInput/textInput";
import Wrapper from "../ui/wrapper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { archiveSchoolClass } from "../../api/schoolclass";
import { showWarningAlert } from "../../utils/alerts/warningAlert";
import { useNavigate } from "react-router-dom";
import SchoolClassInterface from "../../interfaces/schoolclass.interface";

interface SchoolClassFormProps {
  initialValues: { class_name: string; color: string };
  editClassId?: number;
}

export default function SchoolClassForm({ initialValues, editClassId }: SchoolClassFormProps) {
  
    const navigate = useNavigate();
    const {
        formik,
        selectedColor,
        customColor,
        isModalOpen,
        setIsModalOpen,
        handleColorChange,
        handleCustomizedColorChange,
    } = useSchoolClassForm({initialValues, editClassId});

  const defaultColors = [
    "#F46030", "#FAC215", "#076A87B2", "#BC81CF", "#00B095", "#00D1FF",
    "#9F4452B2", "#A69743CC", "#D25BF7", "#FF37B2", "#00713E99"
  ];

const queryClient = useQueryClient();
const mutation = useMutation({
    mutationFn: archiveSchoolClass,
    onSuccess: (editedClass : SchoolClassInterface) => {
        queryClient.setQueryData(['schoolClasses'], (oldSchoolClasses : SchoolClassInterface[]) =>
            oldSchoolClasses ? oldSchoolClasses.map((schoolClass) => schoolClass.id === editClassId ? editedClass : schoolClass) : []);
    
        queryClient.setQueryData(['schoolClass', editClassId], editedClass);
    },
  });

    return(
        <form onSubmit={formik.handleSubmit}>
            <Wrapper extraClass="flex flex-col gap-5">
                <Card 
                    className="mt-6 py-5 bg-test-200 text-black flex justify-between items-center"
                    style={{ backgroundColor: selectedColor }}
                >
                    <div className="flex gap-3">
                        <BackButton/>
                        <h1 className="text-black mb-3">Ma classe</h1>
                        {editClassId && (
                            <IconButton color="white" onClick={() => showWarningAlert("Voulez-vous archiver cette classe ?", () => mutation.mutate(editClassId), "Classe archivée avec succès", () => navigate("/forms"))}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#F46030" d="m12 18l4-4l-1.4-1.4l-1.6 1.6V10h-2v4.2l-1.6-1.6L8 14zM5 8v11h14V8zm0 13q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zm6.6 7.5"/></svg>
                            </IconButton>
                        )}
                    </div>
                    <div className="flex flex-col lg:flex-row gap-3">
                        <TextInput
                            label="Nom de la classe"
                            name="class_name"
                            value={formik.values.class_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.class_name && formik.errors.class_name}
                        />
                        
                    </div>
                    <label htmlFor="color" className="text-xl font-semibold text-black text-center mt-3">Choix de la couleur</label>
                    <fieldset className="mt-1 rounded-lg bg-white w-[90%] p-5">
                        <ul className="grid grid-cols-4 lg:grid-cols-6 gap-3">
                            {defaultColors.map((color) => (
                            <li
                                key={color}
                                className="flex items-center justify-center"
                            >
                                <IconButton 
                                    className="rounded-full"
                                    style={{
                                        backgroundColor: color,
                                        ...(selectedColor === color && { border: 'solid 2px #076A87' })
                                        }}
                                    onClick={() => handleColorChange(color)}
                                    aria-label={`Choose color ${color}`}
                                >
                                    {selectedColor === color ? (<i className="fas fa-check" />) : ("")}
                                </IconButton>
                            </li>
                            ))}
                            <li
                                className="flex items-center justify-center"
                            >
                                <IconButton 
                                    className="rounded-full"
                                    style={{
                                        backgroundColor: customColor === '' ? '#54C3B2' : customColor,
                                        ...(customColor !== '' && { border: 'solid 2px #076A87' })
                                    }}
                                    onClick={() => setIsModalOpen(true)}
                                    aria-label="Choose custom color"
                                >
                                    <i className="fas fa-plus" />
                                </IconButton>
                            </li>
                        </ul>
                    </fieldset>

                    
                </Card>

                <DefaultButton
                    height={75}
                    label="Valider"
                    type="submit"
                    background="bg-test-200"
                    opacity={60}
                />

                <ColorPickerModal 
                    open={isModalOpen}
                    handleOpen={() => setIsModalOpen(!isModalOpen)}
                    customColor={customColor}
                    handleColorChange={handleCustomizedColorChange}
                />
            </Wrapper>

        </form>

        
    )
}