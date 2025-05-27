import Swal from "sweetalert2";

interface ShowPopupProps {
  text: string;
  type: "success" | "failed" | "info";
  showIcon?: boolean;
  isQuestion?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const showPopup = ({
  text,
  type,
  showIcon = true,
  isQuestion = false,
  // confirmButtonText = 'Continue',
  cancelButtonText = "Cancel",
  onConfirm,
  onCancel,
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
      buttonText = "Continue";
      break;
    case "failed":
      iconSrc = "/images/failedIcon.svg";
      title = "ERROR!";
      titleColor = "#700C18";
      buttonColor = "#700C18";
      buttonText = "Try Again";
      break;
    case "info":
      iconSrc = "/images/infoIcon.svg";
      title = "INFO";
      titleColor = "#0056D2";
      buttonColor = "#0056D2";
      buttonText = "Okay";
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
    showCancelButton: isQuestion,
    confirmButtonText: buttonText,
    showCloseButton: true,
    customClass: {
      popup: "custom-popup",
      closeButton: `custom-close-button ${type}`,
      container: "popup-overlay",
    },
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel && onCancel) {
      onCancel();
    }
  });
};

export default showPopup;
