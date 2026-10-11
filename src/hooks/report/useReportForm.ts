import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import ReportInterface from '../../interfaces/report.interface';
import { editReport } from '../../api/report';
import { TrimesterEnum } from '../../interfaces/test.interface';
import { useToast } from '../../contexts/ToastContext';

interface SchoolClassFormProps {
  report: ReportInterface | undefined;
  trimester: TrimesterEnum;
}

export const useReportForm = (props : SchoolClassFormProps) => {
  const queryClient = useQueryClient();
  const {report, trimester} = props;
  const { showToast } = useToast();

  const formik = useFormik({
    initialValues: {
      description: report?.description ?? " "
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Appréciation requise').max(400, 'L\'appréciation ne peut pas dépasser 400 caractères'),
    }),
    onSubmit: async (values) => {
      const editedReport = await editReport(
        {
          description: values.description,
          trimester: trimester
        },
        report?.id ?? 0
      );
      if(editedReport) {

        queryClient.setQueryData(['studentReport', editedReport.studentId], (oldReports : ReportInterface[]) =>
          oldReports ? oldReports.map((report) => report.id === editedReport.id ? editedReport : report) : []);

        showToast("Appréciation modifiée avec succès !", "success");
      }
    }
  });

  return {
    formik
  };
};
