import { toast as reactToast, ToastOptions } from "react-toastify";

export const toast = (type: ToastOptions["type"], message: string) => {
  reactToast(message, {
    type,
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const toastSuccess = (message: string) => toast("success", message);

export const toastInfo = (message: string) => toast("info", message);

export const toastWarning = (message: string) => toast("warning", message);

export const toastError = (message: string) => toast("error", message);
