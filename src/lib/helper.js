import Swal from "sweetalert2";

export const showSuccessAlert = (title, text) => {
  Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#3085d6",
  });
};

export const showErrorAlert = (title, text) => {
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#d33",
  });
};

export const showConfirmDialog = async (title, text) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  return result.isConfirmed;
};

export const showToast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: "top",
    icon,
    title,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};
