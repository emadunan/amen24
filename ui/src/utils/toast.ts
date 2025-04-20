import { toast } from "react-toastify";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning" = "info",
) => {
  console.log("🚀 [showToast] type:", type, "message:", message);

  try {
    toast[type](message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  } catch (error) {
    console.warn("⚠️ Toast failed. Is <ToastContainer /> mounted?", error);
  }
};
