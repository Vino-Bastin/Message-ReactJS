import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { AuthResponse, ErrorResponse } from "../types";
import { setAuthToken, logout } from "./features/authSlice";
import { RootState } from "./store";

//* function to prepare request (authorization) header for auth token and refresh token
const prepareHeaders = (
  headers: Headers,
  {
    getState,
  }: Pick<BaseQueryApi, "getState" | "type" | "extra" | "endpoint" | "forced">,
  flag?: "refreshToken"
): Headers => {
  //* get the auth and refresh token from the store
  const {
    auth: { authToken, refreshToken },
  } = getState() as RootState;
  let token = authToken;
  if (flag === "refreshToken") token = refreshToken;

  //* setting headers
  if (token) headers.set("Authorization", `Bearer ${token}`);
  return headers;
};

//* base query with authToken
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
  prepareHeaders: (headers, api) => {
    prepareHeaders(headers, api);
  },
});

//* refresh token with refresh query endpoint
const refreshQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/",
  credentials: "include",
  prepareHeaders: (headers, api) => {
    prepareHeaders(headers, api, "refreshToken");
  },
});

//* auth interceptor
const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta | AuthResponse
> = async (arg, api, extraOptions) => {
  //* send a request to the server
  let result = await baseQuery(arg, api, extraOptions);
  //* check the response was reject with un-authorization
  if (result.error && result.error.status === 401) {
    //* send a request to get a refresh token
    const refreshResult = await refreshQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );
    //* check request was success or not
    if (refreshResult.data) {
      //* update store with new auth token
      const { authToken } = refreshResult.data as AuthResponse;
      api.dispatch(setAuthToken(authToken));
      //* resend a previous (rejected with un-authorized)
      result = await baseQuery(arg, api, extraOptions);
    } else {
      //* logout if the refresh token request was rejected
      api.dispatch(logout());
    }
  }
  //* send a response from server
  return result;
};

//* base api slice
export const baseApi = createApi({
  reducerPath: "message",
  tagTypes: ["Post", "Comment"],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export default baseApi;
