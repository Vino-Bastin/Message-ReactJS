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
