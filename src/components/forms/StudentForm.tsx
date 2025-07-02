import DefaultButton from "../ui/defaultButton";
import TextInput from "../ui/formInput/textInput";
import { useStudentForm } from "../../hooks/student/useStudentForm";

export interface StudentFormProps {
  initialValues: { lastName: string; firstName: string };
  editStudentId?: number;
}

export default function StudentForm({ initialValues, editStudentId }: StudentFormProps) {
  
    const {
        formik,
    } = useStudentForm({initialValues, editStudentId});

    return(
        <form onSubmit={formik.handleSubmit}>
                     
            <div className="flex flex-col gap-3">
                <TextInput
                    label="Nom de l'élève"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastName && formik.errors.lastName}
                />

                <TextInput
                    label="Prénom de l'élève"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.firstName && formik.errors.firstName}
                />
                                                
                <DefaultButton
                    height={75}
                    label="Valider"
                    type="submit"
                    opacity={60}
                />
            </div>

        </form>
        
    )
}