import Swal from "sweetalert2";

export const showWarningAlert = (title: string, triggeredFunction: () => void, confirmMessage: string, redirectCallback?: () => void) => {

  return Swal.fire({
  title,
  showCancelButton: true,
  cancelButtonText: "Annuler",
  confirmButtonText: "Oui, archiver",
    customClass: {
      confirmButton:
        "bg-test-300 text-white px-4 py-2 rounded-md hover:bg-amber-600 focus:ring-2 focus:ring-amber-300",
    },
}).then((result) => {
  if (result.isConfirmed) {
    triggeredFunction();
    Swal.fire(confirmMessage).then(() => {
      if (redirectCallback) redirectCallback();
    })
  }
});
};