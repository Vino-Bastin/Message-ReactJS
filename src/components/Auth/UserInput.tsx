import React, { ChangeEvent } from "react";
import ErrorMessage from "../Utils/ErrorMessage";

interface UserInput {
  label: string;
  type: string;
  name: string;
  value: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  message: string | undefined;
}

const UserInput: React.FC<UserInput> = ({
  label,
  message,
  name,
  onChangeHandler,
  type,
  value,
}) => {
  return (
    <>
      <div
        className={`input-container flex flex-col border p-2 justify-center h-16 m-2 ${
          value.length !== 0 ? "input-active" : ""
        }`}
      >
        <span>{label}</span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChangeHandler}
        />
      </div>
      {message && <ErrorMessage message={message} />}
    </>
  );
};

export default UserInput;
