import React from "react";

interface IProps {
  value: string;
  name: string;
  label: string;
  rows?: number;
  cols?: number;
  changeInputVal: (e: any, error: string | undefined) => void;
  error: string | undefined;
  disabled?: boolean;
}

const TextArea: React.FC<IProps> = ({
  value,
  name,
  label,
  rows,
  cols,
  error,
  disabled,
  changeInputVal,
}) => {
  const changeInputValHandler = (e: any) => {
    changeInputVal(e, "error");
  };

  return (
    <div className="my-2 w-full px-4 ">
      <label className="font-medium">{label}</label>
      <textarea
        disabled={disabled}
        cols={cols || 20}
        rows={rows || 5}
        className="w-full border-2 p-2 mt-2"
        name={name}
        onChange={changeInputValHandler}
        value={value}
      ></textarea>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};
export default TextArea;
