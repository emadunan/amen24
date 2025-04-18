import { toast } from "react-toastify";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning" = "info",
) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
