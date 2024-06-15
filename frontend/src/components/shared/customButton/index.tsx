import { MouseEventHandler } from "react";

interface CustomButtonProps {
  type?: string;
  className?: string;
  onClick?: (event: MouseEventHandler<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: any;
}

const CustomButton = (props: CustomButtonProps) => {
  let bgColorClass = "";
  let textColorClass = "";

  switch (props.theme) {
    case "alternate":
      bgColorClass = "bg-blue-600 hover:bg-blue-400 active:bg-gray-700";
      textColorClass = "text-blue-950";
      break;
    case "danger":
      bgColorClass =
        "bg-red-800 hover:bg-red-700 hover:border-red-600 active:bg-red-900";
      textColorClass = "text-red-100";
      break;
    case "attention":
      bgColorClass = "bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-600";
      textColorClass = "text-yellow-900";
      break;
    default:
      bgColorClass = "bg-primary hover:bg-light active:bg-primary";
      textColorClass = "text-dark";
      break;
  }

  return (
    <button
      className={`px-4 py-1.5 rounded-lg font-semibold font-heading transition flex flex-row items-center justify-center gap-2 active:translate-y-1 ${bgColorClass} ${textColorClass} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled ? props.disabled : false}
      id={props.id}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default CustomButton;
