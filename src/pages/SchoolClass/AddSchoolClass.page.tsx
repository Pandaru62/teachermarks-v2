import SchoolClassForm from "../../components/forms/SchoolClassForm";

export default function AddSchoolClassPage() {

    return (
        <SchoolClassForm
            initialValues={{ class_name: "", color: "" }}
        />
    )

}

