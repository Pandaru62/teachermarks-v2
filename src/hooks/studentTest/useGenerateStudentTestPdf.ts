import { useMutation } from "@tanstack/react-query";
import { generateGridPdf, generatePdf } from "../../api/studenttest";
import { useToast } from "../../contexts/ToastContext";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

export default function useGenerateStudentTestPdf() {
  const { showToast } = useToast();
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
      showToast("Le PDF a été généré avec succès.", "success");
    },
    onError: async (error) => {
      showToast(await getApiErrorMessage(error) || "Une erreur est survenue lors du téléchargement du PDF. Veuillez réessayer.", "error");
    }
  });

  return {
    downloadPdf: mutation.mutate,
    isDownloading: mutation.isPending,
    isError: mutation.isError,
  };
}

export function useGenerateGridStudentTestPdf() {
  const { showToast } = useToast();
  const mutation = useMutation({
    mutationFn: generateGridPdf,
    onSuccess: (pdfBlob, testId) => {
      const downloadUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `evaluation-${testId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
      showToast("Le PDF a été généré avec succès.", "success");
    },
    onError: async (error) => {
      showToast(await getApiErrorMessage(error) || "Une erreur est survenue lors du téléchargement du PDF. Veuillez réessayer.", "error");
    }
  });

  return {
    downloadGridPdf: mutation.mutate,
    isDownloading: mutation.isPending,
    isError: mutation.isError,
  };
}