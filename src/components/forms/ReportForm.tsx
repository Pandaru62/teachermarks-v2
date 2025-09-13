import ReportInterface from "../../interfaces/report.interface";
import { useReportForm } from "../../hooks/report/useReportForm";
import { TrimesterEnum } from "../../interfaces/test.interface";
import { Button, IconButton, Textarea, Typography } from "@material-tailwind/react";

interface ReportFormProps {
  report: ReportInterface | undefined;
  trimester: TrimesterEnum;
}

export default function ReportForm({ report, trimester }: ReportFormProps) {
  
const { formik } = useReportForm({report, trimester});
const originalDescription = report?.description ?? " ";

    return(
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2 mb-4">
            <Textarea 
                label={"Appréciation " + trimester}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
            />
            { formik.touched.description && formik.errors.description && (
            <Typography variant="small" color="pink" className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-6h2v2h-2zm0-10h2v8h-2z"/></svg> 
                { formik.touched.description && formik.errors.description }
            </Typography>)}

            <div className="ms-auto flex gap-3">
                <Button 
                    color="red"
                    disabled={formik.values.description === originalDescription}
                    onClick={() => formik.setValues({description: originalDescription})}
                    className="flex items-center gap-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M7.16 10.972A7 7 0 0 1 19.5 15.5a1.5 1.5 0 1 0 3 0c0-5.523-4.477-10-10-10a9.97 9.97 0 0 0-7.418 3.295L4.735 6.83a1.5 1.5 0 1 0-2.954.52l1.042 5.91c.069.391.29.74.617.968c.403.282.934.345 1.385.202l5.644-.996a1.5 1.5 0 1 0-.52-2.954l-2.788.491Z"></path></g></svg>
                    Annuler les changements
                </Button>
                <Button type="submit" color="green" className="flex items-center gap-1" disabled={formik.values.description === originalDescription}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={14} height={14} viewBox="0 0 24 24"><path fill="currentColor" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-9 11q1.25 0 2.125-.875T15 15t-.875-2.125T12 12t-2.125.875T9 15t.875 2.125T12 18m-6-8h9V6H6z"></path></svg>
                    Valider
                </Button>
                <IconButton disabled={true}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M10 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v4"></path><path d="M14 21v-4a2 2 0 1 1 4 0v4m-4-2h4m3-4v6"></path></g></svg>
                </IconButton>
            </div>
        </form>

    )
}