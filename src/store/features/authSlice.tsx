import { createSelector, createSlice } from "@reduxjs/toolkit";
// import { SignUpInput } from "../../types";
import baseApi from "../apiSlice";
import { transformErrorResponse } from "../helper";
import { RootState } from "../store";

//* initial state for auth slice
const initialAuthState = {
  status: false,
  authToken: "",
  refreshToken: "",
  userDetails: {
    firstName: "",
    lastName: "",
    id: "",
    userName: "",
  },
};

//* auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuhState: (state, action) => {
      return { ...action.payload, status: true };
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    logout: () => {
      return initialAuthState;
    },
  },
});

//* auth slice actions
export const { setAuhState, logout, setAuthToken } = authSlice.actions;

//* rtk quires for auth
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //* login query
    login: builder.mutation({
      query: (loginCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: loginCredentials,
      }),
      transformErrorResponse: transformErrorResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        //* setting auth state after query fulfilled
        const response = await queryFulfilled;
        if (response.data) dispatch(setAuhState(response.data));
      },
    }),

    //* refreshToken query for auto login functionality
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      transformErrorResponse: transformErrorResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        //* setting auth state after query fulfilled
        const response = await queryFulfilled;
        if (response.data) dispatch(setAuhState(response.data));
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      transformErrorResponse: transformErrorResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },
    }),

    isValidUserName: builder.mutation({
      query: (userName: string) => ({
        url: "/auth/isvalidusername",
        method: "POST",
        body: {
          userName,
        },
      }),
      transformErrorResponse: transformErrorResponse,
    }),

    signUp: builder.mutation({
      query: (arg) => ({
        url: "/auth/signup",
        method: "POST",
        body: arg,
      }),
      transformErrorResponse: transformErrorResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        //* setting auth state after query fulfilled
        const response = await queryFulfilled;
        if (response.data) dispatch(setAuhState(response.data));
      },
    }),
  }),
});

export default authApi;

export const {
  useLoginMutation,
  useLogoutMutation,
  useIsValidUserNameMutation,
  useSignUpMutation,
} = authApi;

export const authReducer = authSlice.reducer;

export const authSelector = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth
);
