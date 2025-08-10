import DefaultButton from "../ui/defaultButton";
import TextInput from "../ui/formInput/textInput";
import { useProfileForm } from "../../hooks/profile/useProfileForm";
import { UserWithoutPassword } from "../../hooks/useAuthStore";

interface ProfileFormProps {
    user: UserWithoutPassword | null
}

export default function ProfileForm(props: ProfileFormProps) {

    const {user} = props;
    const initialValues = {
        firstname: user?.firstname ?? "",
        lastname: user?.lastname ?? "",
        school: user?.school ?? ""
    }
  
    const {
        formik,
    } = useProfileForm(initialValues);

    return(
        <form onSubmit={formik.handleSubmit}>
                     
            <div className="flex flex-col gap-3">
                <TextInput
                    label="Nom"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastname && formik.errors.lastname}
                />

                <TextInput
                    label="Prénom"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstname && formik.errors.firstname}
                />

                <TextInput
                    label="Établissement"
                    name="school"
                    value={formik.values.school}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.school && formik.errors.school}
                />
                                                
                <DefaultButton
                    height={50}
                    label="Valider"
                    type="submit"
                    opacity={60}
                />
            </div>

        </form>
        
    )
}