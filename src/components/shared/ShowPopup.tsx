import Swal from "sweetalert2";

interface ShowPopupProps {
  text: string;
  type: "success" | "failed" | "info";
  showIcon?: boolean;
  isQuestion?: boolean;
  confirmButtonText?: string;
  titleError?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  duration?: number;
  onTimeout?: () => void;
}

const showPopup = ({
  text,
  type,
  showIcon = true,
  isQuestion = false,
  confirmButtonText = "Continue",
  cancelButtonText = "Cancel",
  titleError = "ERROR!",
  onConfirm,
  onCancel,
  duration,
  onTimeout,
}: ShowPopupProps) => {
  let iconSrc = "";
  let title = "";
  let titleColor = "";
  let buttonColor = "";
  let buttonText = "";

  // Configure properties based on the type
  switch (type) {
    case "success":
      iconSrc = "/images/successIcon.svg";
      title = "SUCCESS!";
      titleColor = "#008000";
      buttonColor = "#20AE5C";
      buttonText = confirmButtonText || "Continue";
      break;
    case "failed":
      iconSrc = "/images/failedIcon.svg";
      title = titleError;
      titleColor = "#700C18";
      buttonColor = "#700C18";
      buttonText = confirmButtonText || "Try Again";
      break;
    case "info":
      iconSrc = "/images/infoIcon.svg";
      title = "INFO";
      titleColor = "#0056D2";
      buttonColor = "#0056D2";
      buttonText = confirmButtonText || "Okay";
      break;
    default:
      throw new Error("Invalid popup type");
  }

  Swal.fire({
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; gap: 40px;">
       ${showIcon ? `<img src="${iconSrc}" alt="${type} Icon"/>` : ""}
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <h2 style="color: ${titleColor}; font-size: 24px; font-weight: 600;">
            ${title}
          </h2>
          <p style="color: #475467; font-size: 16px; font-weight: 400">
            ${text}
          </p>
        </div>
      </div>
    `,
    background: "#FFF",
    confirmButtonColor: buttonColor,
    cancelButtonColor: "#D0D5DD",
    showCancelButton: isQuestion,
    confirmButtonText: buttonText,
    cancelButtonText: cancelButtonText,
    showCloseButton: true,
    timer: duration ?? undefined,
    timerProgressBar: !!duration,
    customClass: {
      popup: "custom-popup",
      closeButton: `custom-close-button ${type}`,
      container: "popup-overlay",
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    } else if (
      (result.dismiss === Swal.DismissReason.cancel ||
        result.dismiss === Swal.DismissReason.backdrop ||
        result.dismiss === Swal.DismissReason.close) &&
      onCancel
    ) {
      onCancel();
    } else if (result.dismiss === Swal.DismissReason.timer && onTimeout) {
      onTimeout();
    }
  });
};

export default showPopup;
