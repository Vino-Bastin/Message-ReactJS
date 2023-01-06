export interface AuthResponse {
  status: boolean;
  authToken: string;
  refreshToken: string;
  userDetails: {
    firstName: string;
    lastName: string;
    id: string;
    userName: string;
  };
}

export interface SignUpInput {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  confirmPassword: string;
}
