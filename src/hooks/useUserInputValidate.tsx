import { ChangeEvent, useRef, useState } from "react";
import { SignUpInput } from "../types";

interface errorMessage {
  [Key: string]: string;
}

interface initialState {
  [key: string]: string;
}

interface validators {
  [key: string]: {
    validate: (value: string, object?: {}) => boolean;
    message: string;
  };
}

export const useUserInputValidate = (
  initialState: initialState,
  validators: validators
) => {
  const [input, setInput] = useState(initialState);
  const isValid = useRef<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<errorMessage>({});

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((input) => {
      return { ...input, [e.target.name]: e.target.value };
    });

    const isError = validate(e.target.name, e.target.value);

    if (isError.status) {
      setErrorMessage((message) => {
        delete message[e.target.name];
        return { ...message };
      });
    } else {
      setErrorMessage((message) => {
        message[e.target.name] = isError.message;
        return { ...message };
      });
    }
  };

  const validate = (
    key: string,
    value: string
  ): { status: boolean; message: string } => {
    if (!validators[key]) return { status: false, message: "No key found" };

    const { validate, message } = validators[key];

    if (!validate(value, input)) {
      isValid.current = false;
      return {
        status: false,
        message: message,
      };
    } else {
      isValid.current = true;
      return {
        status: true,
        message: "no error",
      };
    }
  };

  const onValidate = (...args: string[]): boolean => {
    let message: errorMessage = {};

    args.forEach((key) => {
      if (input[key] !== undefined) {
        const isError = validate(key, input[key]);

        if (isError.status) {
          delete message[key];
        } else {
          message[key] = isError.message;
        }
      }
    });

    setErrorMessage(message);

    return isValid.current;
  };

  return {
    input,
    onValidate,
    onChangeHandler,
    setErrorMessage,
    isValid: isValid.current,
    message: errorMessage,
  };
};
