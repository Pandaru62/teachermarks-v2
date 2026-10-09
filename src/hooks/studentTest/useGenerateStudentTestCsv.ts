import { useMutation } from "@tanstack/react-query";
import { generateCsv } from "../../api/studenttest";

export default function useGenerateStudentTestCsv() {
  const mutation = useMutation({
    mutationFn: generateCsv,
    onSuccess: (csvBlob, testId) => {
      const downloadUrl = URL.createObjectURL(csvBlob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `evaluation-${testId}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
    },
  });

  return {
    downloadCsv: mutation.mutate,
    isDownloading: mutation.isPending,
    isError: mutation.isError,
  };
}