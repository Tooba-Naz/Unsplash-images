import React from "react";

const variants = {
  primary:
    "bg-indigo-600 text-white hover:enabled:bg-indigo-700 focus:ring-indigo-500",
  danger: "bg-red-600 text-white hover:enabled:bg-red-700 focus:ring-red-500",
  naked: "hover:text-gray-600 text-gray-500 shadow-none",
  Contact: "text-white bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 shadow-lg shadow-gray-500/50 dark:shadow-lg dark:shadow-gray-800/80 font-medium rounded-3xl text-sm px-5 py-2.5 text-center mr-2 mb-2",
  downloadbtn:"bg-gray-300 text-white hover:enabled:bg-white  p-2 rounded  w-10 h-10 bottom-5 right-5 ",
  addbtn:"bg-gray-300 text-white hover:enabled:bg-white rounded  w-10 h-10 top-5 right-5",
  deletebtn:"bg-gray-300 text-white hover:enabled:bg-white rounded  w-10 h-10 top-5 right-[70px]",
  settingbtn:"bg-gray-300 text-white hover:enabled:bg-white rounded  w-10 h-10 top-5 left-5",
  tagbtn:"bg-gray-300 text-white hover:enabled:bg-white  p-2 rounded  w-10 h-10 bottom-5 left-5",
  setting:"pt-4 text-black text-sm rounded"
};

const sizes = {
  small: "px-2 py-1 text-xs leading-1",
  medium: "px-4 py-2 text-sm",
  large: "px-4 py-2 text-base",
};

export const Button = ({
  className,
  variant = "primary",
  size = "small",
  ...props
}) => {
  return (
    <button
      className={`inline-flex justify-center items-center border border-transparent
            rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
            ${variants[variant]}
            ${sizes[size]}
            `}
      {...props}
    />
  );
};
