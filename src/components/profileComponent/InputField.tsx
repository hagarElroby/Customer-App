import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  value,
  type = "text",
  onChange,
}) => {
  return (
    <div className="mb-4 relative w-full">
      <label className="block text-xs font-medium text-lightGray absolute left-2 top-3">
        {label}*
      </label>
      <input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        className={`w-full h-14 mt-2 px-3 py-2 border border-whiteGray rounded-md focus:outline-none focus:ring focus:border-indigo-500`}
      />
    </div>
  );
};

export default InputField;
