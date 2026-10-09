import { useMutation } from "@tanstack/react-query";
import { generatePdf } from "../../api/studenttest";

export default function useGenerateStudentTestPdf() {
  const mutation = useMutation({
    mutationFn: generatePdf,
    onSuccess: (pdfBlob, testId) => {
      const downloadUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `evaluation-${testId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    },
  });

  return {
    downloadPdf: mutation.mutate,
    isDownloading: mutation.isPending,
    isError: mutation.isError,
  };
}