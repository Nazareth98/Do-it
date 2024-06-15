import { ReactElement } from "react";

interface CustomInputProps {
  label: string;
  colSpan?: number;
  icon?: React.ReactElement;
  register?: any; // Pode ajustar o tipo conforme necessário
  [x: string]: any;
}

const CustomInput = ({
  label,
  colSpan = 1,
  icon,
  register,
  className,
  ...inputProps
}: CustomInputProps) => {
  return (
    <div className={`flex flex-col gap-1 relative col-span-${colSpan}`}>
      {label && (
        <label className="text-gray-200 text-sm font-medium" htmlFor={label}>
          {label}
        </label>
      )}
      <input
        className={
          "bg-gray-800 p-2 border-2 border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-primary focus:bg-gray-900 placeholder:italic placeholder:text-gray-400 placeholder:text-sm " +
          className
        }
        {...inputProps}
        {...register}
      />
      <div className={label ? "float-icon" : "float-icon -translate-y-1/2"}>
        {icon}
      </div>
    </div>
  );
};

export default CustomInput;
