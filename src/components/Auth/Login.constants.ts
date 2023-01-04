export const userInputTemplate = [
  {
    label: "User Name",
    type: "text",
    name: "userName",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
  },
];

export const initialState = {
  userName: "",
  password: "",
};

export const validators = {
  userName: {
    validate: (value: String, object?: {}) => value.trim().length > 2,
    message: "User Name must have at least 3 characters.",
  },
  password: {
    validate: (value: string, object?: {}) => value.trim().length >= 9,
    message: "Password Must have at least 9 characters.",
  },
};
