import { userInputTemplateInterface } from "./SingUp.types";

export const userInputTemplate: userInputTemplateInterface = {
  1: [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastName",
    },
    {
      label: "User Name",
      type: "text",
      name: "userName",
    },
  ],
  2: [
    {
      label: "Password",
      name: "password",
      type: "password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
    },
  ],
};

export const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  password: "",
  confirmPassword: "",
};

export const validators = {
  firstName: {
    validate: (value: string, object?: {}) => value.trim().length > 2,
    message: "First Name must have at least 3 characters.",
  },
  lastName: {
    validate: (value: string, object?: {}) => value.trim().length > 2,
    message: "First Name must have at least 3 characters.",
  },
  userName: {
    validate: (value: string, object?: {}) => value.trim().length > 2,
    message: "User Name must have at least 3 characters.",
  },
  password: {
    validate: (value: string, object?: {}) => value.trim().length > 9,
    message: "Password must have at least 9 characters.",
  },
  confirmPassword: {
    validate: (value: string, object?: {}): boolean => {
      if (!object) return false;
      const { password } = object as typeof initialState;
      if (!password) return false;
      return value.trim() === password.trim();
    },
    message: "Password and confirm Password must be same.",
  },
};
