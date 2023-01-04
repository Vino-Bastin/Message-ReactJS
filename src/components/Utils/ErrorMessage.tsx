import React from "react";

interface ErrorMessage {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessage> = ({ message }) => {
  return <span className="m-0 p-1 text-red-700">{message}</span>;
};

export default ErrorMessage;
