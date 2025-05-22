import { Card, IconButton } from "@material-tailwind/react";
import Wrapper from "../../components/ui/wrapper";
import TextInput from "../../components/ui/formInput/textInput";
import DefaultButton from "../../components/ui/defaultButton";
import BackButton from "../../components/ui/backButton";
import ColorPickerModal from "../../components/ui/ColorPickerModal";
import { useSchoolClassForm } from "../../hooks/schoolClass/useSchoolClassForm";

export default function AddSchoolClassPage() {

    const {
        formik,
        selectedColor,
        customColor,
        isModalOpen,
        setIsModalOpen,
        handleColorChange,
        handleCustomizedColorChange,
    } = useSchoolClassForm();

  const defaultColors = [
    "#F46030", "#FAC215", "#076A87B2", "#BC81CF", "#00B095", "#00D1FF",
    "#9F4452B2", "#A69743CC", "#D25BF7", "#FF37B2", "#00713E99"
  ];

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

