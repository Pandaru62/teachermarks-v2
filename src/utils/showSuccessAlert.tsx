import Swal from "sweetalert2";

export const showSuccessAlert = (title: string, redirectCallback?: () => void) => {
  return Swal.fire({
    title,
    icon: "success",
    draggable: true,
    buttonsStyling: false,
    confirmButtonText: "Continuer",
    customClass: {
      confirmButton:
        "bg-test-300 text-white px-4 py-2 rounded-md hover:bg-amber-600 focus:ring-2 focus:ring-amber-300",
    },
  }).then(() => {
    if (redirectCallback) redirectCallback();
  });
};