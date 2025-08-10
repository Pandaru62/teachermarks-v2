import { usePreferencesForm } from "../../hooks/profile/usePreferencesForm";
import { useAuthStore } from "../../hooks/useAuthStore";
import { TrimesterEnum } from "../../interfaces/test.interface";
import DefaultButton from "../ui/defaultButton";
import SelectEnumInput from "../ui/formInput/selectEnumInput";


export default function PreferencesForm() {
  
    const {
        formik,
    } = usePreferencesForm();

    const { user } = useAuthStore();
    
    return(
        <form 
            className="grid grid-cols-2 gap-5"
            onSubmit={formik.handleSubmit}
        >
            <SelectEnumInput
                label="Trimestre actuel"
                defaultOption={user?.current_trimester ?? TrimesterEnum.TR1}
                name="current_trimester"
                options={Object.values(TrimesterEnum)}
                onChange={formik.handleChange}
                error={formik.touched.current_trimester && formik.errors.current_trimester}
            />
                                                
            <DefaultButton
                height={25}
                label="Valider"
                type="submit"
                opacity={100}
            />

        </form>
        
    )
}