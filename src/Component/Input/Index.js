import React from "react";

export const Input = ({
  type,
  name,
  value,
  inputId,
  defaultValue,
  label,
  helperText,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div>
      {label && <label className="block text-sm text-gray-600 font-bold mb-2">{label}</label>}

      {helperText && (
        <label className="block text-sm text-gray-600">{helperText}</label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        id={inputId}
        onChange={onChange}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={"placeholder border-[#494949] border bottom-5 text-sm lg:w-[600px] h-[40px] md:w-full  py-2 px-3 text-[#494949] placeholder-[#494949]  leading-tight  focus:outline-none  focus:shadow-xl  dark:bg-slate-900 dark:border-gray-700 dark:text-[#494949]"}
      />

      <p className="mt-2 text-sm text-red-600">{error}</p>
    </div>
  );
};
