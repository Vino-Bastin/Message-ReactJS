import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ErrorResponse } from "../types";

export const transformErrorResponse = (
  response: { status: any; data: ErrorResponse } | FetchBaseQueryError
): string => {
  if (response.status === "FETCH_ERROR")
    return "Unable to connect to remote server, Please check your internet connection";

  if (response.status === "TIMEOUT_ERROR")
    return "Time Out , Please check your internet connection";

  const serverResponse = response.data as ErrorResponse;

  if (serverResponse.status === "failed") {
    if (typeof serverResponse.message === "string")
      return serverResponse.message;
    else return serverResponse.message.join(",");
  }
  return "Something went wrong, Please try after some time";
};
