import Wrapper from "../../components/ui/wrapper";
import { Card } from "@material-tailwind/react";
import DefaultButton from "../../components/ui/defaultButton";
import { useNotificationForm } from "../../hooks/notifications/useNotificationForm";
import { useEffect, useState } from "react";
import { TextEditorReact } from "../../components/wysiwyg/wysiwyg";
import TextInput from "../../components/ui/formInput/textInput";

export default function AdminAddNotifPage() {

    const [content, setContent] = useState("");

    useEffect(() => {
        formik.setFieldValue("message", content)
    }, [content])

    const {
        formik
    } = useNotificationForm();

    return (
       <Wrapper>

            <Card className={`mt-6 py-5 bg-test-200 text-black flex p-5`}>
                <h1 className="text-black text-center">Envoyer une notification</h1>
                <form onSubmit={formik.handleSubmit}>
                    <TextInput
                        name="title"
                        label="Titre"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && formik.errors.title}
                    />
                    <TextEditorReact onChange={setContent}/>
                    <DefaultButton
                        height={50}
                        label="Valider"
                        type="submit"
                        opacity={60}
                    />
                </form>
            </Card>

       </Wrapper>
    )

}

