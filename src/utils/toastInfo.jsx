import toast from "react-hot-toast";

export default function toastInfo(message) {
  toast(message, {
    icon: (
      <img height="20px"
        src="/info.svg"
        className="toast-info-icon"
        alt="toast-info-icon"
      />
    )
  });
}