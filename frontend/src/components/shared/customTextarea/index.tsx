import React from "react";

interface TextareaProps {
  label: string;
  colSpan?: number;
  rows?: number;
  register?: any; // Pode ajustar o tipo conforme necessário
  [x: string]: any;
}

const CustomTextarea = ({
  label,
  colSpan = 1,
  icon,
  register,
  className,
  rows,
  ...inputProps
}: TextareaProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-200 text-sm font-medium" htmlFor={label}>
        {label}
      </label>
      <textarea
        id={label}
        className="bg-gray-800 p-2 border-2 border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-primary focus:bg-gray-900 placeholder:italic placeholder:text-gray-400 placeholder:text-sm resize-none"
        rows={rows ? rows : 5}
        {...inputProps}
        {...register}
      ></textarea>
    </div>
  );
};

export default CustomTextarea;
